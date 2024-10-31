import * as React from "react";
import Script from "next/script";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Card } from "@mui/material";

import { ChartingLibraryWidgetOptions, ResolutionString } from "../../../public/static/charting_library";
import usePairStore from "@/stores/pair";

export const defaultWidgetProps: Partial<ChartingLibraryWidgetOptions> = {
  symbol: "PERP_BTC_USDC",
  interval: "1" as ResolutionString,
  library_path: "/static/charting_library/",
  locale: "en",
  charts_storage_url: "https://saveload.tradingview.com",
  charts_storage_api_version: "1.1",
  client_id: "tradingview.com",
  user_id: "public_user_id",
  fullscreen: true,
  autosize: true,
  theme: "dark",
};

const TVChartContainer = dynamic(() => import("@/components/TVChartContainer").then((mod) => mod.TVChartContainer), {
  ssr: false,
});

export const TradingView = () => {
  const [isScriptReady, setIsScriptReady] = useState(false);

  const pair = usePairStore((state) => state.pair);

  const props = { ...defaultWidgetProps, symbol: pair };

  return (
    <Card variant="outlined" sx={{ flex: 1, height: "100%" }}>
      <Script
        src="/static/datafeeds/udf/dist/bundle.js"
        strategy="lazyOnload"
        onReady={() => {
          setIsScriptReady(true);
        }}
      />
      {isScriptReady && <TVChartContainer {...props} />}
    </Card>
  );
};
