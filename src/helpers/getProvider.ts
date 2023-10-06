import { ProviderRpcClient } from 'everscale-inpage-provider'

declare const window: any

const getProvider = () => {
  const ever = new ProviderRpcClient()

  return ever
}

const ever = getProvider()

export default ever
