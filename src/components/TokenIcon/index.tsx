import { Avatar, AvatarProps } from "@mui/material";
import { getCurrenciesFromPair } from "@/utils";

interface TokenIconProps extends Omit<AvatarProps, "src" | "srcSet"> {
  token: string; // pair or single token
}

export const TokenIcon = ({ token, ...props }: TokenIconProps) => {
  const src = `/tokens/${getCurrenciesFromPair(token).baseCurrency.toLowerCase()}.png`;

  return <Avatar {...props} src={src} />;
};
