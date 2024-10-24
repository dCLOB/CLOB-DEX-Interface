import { Avatar, AvatarProps } from "@mui/material";

interface TokenIconProps extends Omit<AvatarProps, "src" | "srcSet"> {
  token: string; // pair or single token
}

export const TokenIcon = ({ token, ...props }: TokenIconProps) => {
  const src = `/tokens/${token.split("-")[0].toLowerCase()}.png`;

  return <Avatar {...props} src={src} />;
};
