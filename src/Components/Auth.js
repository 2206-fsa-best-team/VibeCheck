import { useState } from "react";
import { supabase } from "../server/supabaseClient";
import { Input, InputGroup, Button } from "@chakra-ui/react";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email, password });
      if (error) throw error;
      alert("Sick. You should be logged in now.");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (email, password) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      alert("You now have an account.");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => setShow(!show);

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Supabase + React</h1>
        <p className="description">Sign in or sign upyour email below</p>
        <div>
          <Input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            className="inputField"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleLogin(email, password);
            }}
            className={"button block"}
            disabled={loading}
            size="sm"
          >
            {loading ? <span>Loading</span> : <span>Login</span>}
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleSignUp(email, password);
            }}
            className={"button block"}
            disabled={loading}
            size="sm"
          >
            {loading ? <span>Loading</span> : <span>Sign Up</span>}
          </Button>
        </div>
      </div>
    </div>
  );
}
