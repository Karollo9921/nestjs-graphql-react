import { Link } from "react-router-dom";
import { Link as MUILink } from "@mui/material";
import { Auth } from "./Auth";

export function Signup() {
  return (
    <Auth submitLabel="Signup" onSubmit={async () => {}}>
      <Link to={"/login"} style={{ alignSelf: "center" }}>
        <MUILink>Login</MUILink>
      </Link>
    </Auth>
  );
}
