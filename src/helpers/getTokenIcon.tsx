import { AmazonIcon, AppleIcon, DexilonIcon, FacebookIcon, TeslaIcon, USDTIcon } from 'icons'

export const getTokenIcon = (code: string): JSX.Element | null => {
  switch (code) {
    case 'AAPL':
      return <AppleIcon />
    case 'AMZN':
      return <AmazonIcon />
    case 'DXLN':
    case 'DRDX':
      return <DexilonIcon />
    case 'FB':
      return <FacebookIcon />
    case 'TSLA':
      return <TeslaIcon />
    case 'USDT':
      return <USDTIcon />
    default:
      return null
  }
}
