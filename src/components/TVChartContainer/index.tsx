"use client";
import { useEffect, useRef } from "react";

import {
  ChartingLibraryWidgetOptions,
  LanguageCode,
  ResolutionString,
  widget,
} from "../../../public/static/charting_library";

import { styled } from "@mui/material";

const TVChartContainerStyled = styled("div")(({ theme }) => ({
  height: "100%",
  padding: theme.spacing(2),
  "& iframe": {
    height: "100% !important",
  },
}));

export const TVChartContainer = (props: Partial<ChartingLibraryWidgetOptions>) => {
  const chartContainerRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: props.symbol,
      // BEWARE: no trailing slash is expected in feed URL
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed("api/mocks/v1", undefined, {
        maxResponseLength: 1000,
        expectedOrder: "latestFirst",
      }),
      interval: props.interval as ResolutionString,
      container: chartContainerRef.current,
      library_path: props.library_path,
      locale: props.locale as LanguageCode,
      disabled_features: [
        "save_chart_properties_to_local_storage",
        "header_quick_search",
        "header_saveload",
        "display_market_status",
        "header_compare",
        "header_symbol_search",
        "create_volume_indicator_by_default",
      ],
      enabled_features: ["hide_left_toolbar_by_default", "adaptive_logo", "hide_resolution_in_legend"],
      favorites: {
        intervals: ["1", "5", "15", "30", "60", "240", "1D", "1W", "1M"] as ResolutionString[],
        chartTypes: ["Area", "Line", "Candles"],
      },
      charts_storage_url: props.charts_storage_url,
      charts_storage_api_version: props.charts_storage_api_version,
      client_id: props.client_id,
      user_id: props.user_id,
      fullscreen: props.fullscreen,
      autosize: props.autosize,
      theme: props.theme,
      custom_css_url: "./style.css",
      overrides: {
        "paneProperties.background": "#121212",
        "paneProperties.backgroundType": "solid",
        "paneProperties.horzGridProperties.color": "#1F2026",
        "paneProperties.vertGridProperties.color": "#1F2026",
        "paneProperties.legendProperties.showSeriesTitle": false,
      },
    };

    const tvWidget = new widget(widgetOptions);

    return () => {
      tvWidget.remove();
    };
  }, [props]);

  return (
    <>
      <TVChartContainerStyled ref={chartContainerRef} />
    </>
  );
};
