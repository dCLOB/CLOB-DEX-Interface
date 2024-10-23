import { PropsWithChildren } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme";
import FreighterProvider from "./FreighterProvider";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <FreighterProvider>{children}</FreighterProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};
