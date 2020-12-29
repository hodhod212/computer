import React, { useEffect, useState } from "react";
import { createOrUpdateUser } from "../../functions/auth";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const Login = ({ history }) => {
  const dispatch = useDispatch();
  const roleBasedRedirect = (res) => {
    /* if (res.data.email === "hodhod212@yahoo.com") {
      history.push("/admin/dashboard");
    }  else */ if (
      res.data.role === "admin"
    ) {
      history.push("/admin/dashboard");
    } else {
      history.push("/user/history");
    }
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user, history]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          /*   if (res.data.email === "hodhod212@yahoo.com") {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: "admin",
                _id: res.data._id,
              },
            });
          } else { */
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          // }
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));

      // history.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };
  const loginform = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            placeholder="Enter your email"
            autoComplete="new-email"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="new-password"
          />
        </div>

        <br />
        <Button
          onClick={handleSubmit}
          type="primary"
          name="register"
          block
          className="mb-3"
          size="large"
          disabled={!email || password.length < 6}
          icon={<MailOutlined />}
        >
          Login with email
        </Button>
      </form>
    );
  };
  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            roleBasedRedirect(res);
          })
          .catch((err) => console.log(err));
        // history.push("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4
              style={{
                backgroundColor: "#888",
                justifyContent: "center",
                textAlign: "center",
                padding: 5,
                color: "#fff",
                width: "100%",
                borderRadius: 5,
                boxShadow: "inset 0px 0px 5px #7cfc00",
                boxSizing: "border-box",
              }}
            >
              Login
            </h4>
          )}
          {loginform()}
          <Button
            onClick={googleLogin}
            type="danger"
            name="register"
            block
            className="mb-3"
            size="large"
            icon={<GoogleOutlined />}
          >
            Login with Google
          </Button>
          <Link to="/forgot/password" className="float-right text-danger">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
