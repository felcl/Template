import '../assets/styles/Home.scss'
import React, { useCallback, useEffect, useState } from 'react'

import { CurrentConfig, Environment } from '../config'
import {
  connectBrowserExtensionWallet,
  getProvider,
  getWalletAddress,
  TransactionState,
} from '../libs/providers'
import { createTrade, executeTrade, TokenTrade } from '../libs/trading'
import { displayTrade } from '../libs/utils'
import { getCurrencyBalance, wrapETH } from '../libs/wallet'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const useOnBlockUpdated = (callback: (blockNumber: number) => void) => {
  useEffect(() => {
    const subscription = getProvider()?.on('block', callback)
    return () => {
      subscription?.removeAllListeners()
    }
  })
}

const Home = () => {
  const [trade, setTrade] = useState<TokenTrade>()
  const [txState, setTxState] = useState<TransactionState>(TransactionState.New)

  const [tokenInBalance, setTokenInBalance] = useState<string>()
  const [tokenOutBalance, setTokenOutBalance] = useState<string>()
  const [blockNumber, setBlockNumber] = useState<number>(0)

  // Listen for new blocks and update the wallet
  useOnBlockUpdated(async (blockNumber: number) => {
    refreshBalances()
    setBlockNumber(blockNumber)
  })

  // Update wallet state given a block number
  const refreshBalances = useCallback(async () => {
    const provider = getProvider()
    const address = getWalletAddress()
    if (!address || !provider) {
      return
    }

    setTokenInBalance(
      await getCurrencyBalance(provider, address, CurrentConfig.tokens.in)
    )
    setTokenOutBalance(
      await getCurrencyBalance(provider, address, CurrentConfig.tokens.out)
    )
  }, [])

  // Event Handlers

  const onConnectWallet = useCallback(async () => {
    if (await connectBrowserExtensionWallet()) {
      refreshBalances()
    }
  }, [refreshBalances])

  const onCreateTrade = useCallback(async () => {
    refreshBalances()
    setTrade(await createTrade())
  }, [refreshBalances])

  const onTrade = useCallback(async (trade: TokenTrade | undefined) => {
    if (trade) {
      setTxState(await executeTrade(trade))
      console.log();
      
    }
  }, [])
  // useEffect(()=>{
  //     const chart = earthFlyLine.init({
  //         dom:document.getElementById('container') as HTMLElement,
  //         map: "world",
  //         config: {
  //           R: 140,
  //           stopRotateByHover:false,
  //           earth: {
  //             color: "#fff",
  //             material: "MeshPhongMaterial",
  //           },
  //           mapStyle: {
  //             areaColor: "#2e3564",
  //             lineColor: "#797eff",
  //           },
  //           spriteStyle: {
  //             color:"#797eff"
  //           }, 
  //           pathStyle: {
  //             color: "#cd79ff", 
  //           },
  //           flyLineStyle: {
  //             color: "#cd79ff",
  //           },
  //         //   scatterStyle: {
  //         //     color: "#cd79ff",
  //         //   },
  //           hoverRegionStyle: {
  //             areaColor: "#cd79ff",
  //           },
  //           regions: {
  //             China: {
  //               areaColor: "red",
  //             },
  //           },
  //           scatterStyle:{
  //             color: "#cd79ff",
  //             size:140 * 0.05, //涟漪的尺寸 默认为 半径R*0.05
  //             duration:2000, // 一个完成动画所需时间(单位毫秒)，值越小动画速度越快
  //             delay:0,//延迟执行时间默认
  //             repeat:Infinity,//循环次数 无限循环
  //           }
  //         },
  //       })
  //       const flyLineData = [
  //         {
  //           from:{
  //             id:1,
  //             lon: 112.45, //经度
  //             lat: 34.62, //维度
  //             style:{
  //                 color: "#cd79ff",
  //                 size:140 * 0.05, //涟漪的尺寸 默认为 半径R*0.05
  //                 duration:2000, // 一个完成动画所需时间(单位毫秒)，值越小动画速度越快
  //                 delay:0,//延迟执行时间默认
  //                 repeat:Infinity,//循环次数 无限循环
  //               }
  //           },
  //           to:{
  //             id:2,
  //             lon: 14, //经度
  //             lat: 52, //维度
  //             style:{
  //                 color: "#cd79ff",
  //                 size:140 * 0.05, //涟漪的尺寸 默认为 半径R*0.05
  //                 duration:2000, // 一个完成动画所需时间(单位毫秒)，值越小动画速度越快
  //                 delay:0,//延迟执行时间默认
  //                 repeat:Infinity,//循环次数 无限循环
  //               }
  //           },
  //           style:{
  //             pathStyle: {
  //                 color: "#cd79ff", 
  //               }, //config.pathStyle配置一致
  //             flyLineStyle: {
  //                 color: "#cd79ff",
  //               }, //config.flyLineStyle配置一致
  //           }
  //         }
  //       ]
  //       chart.addData('flyLine',flyLineData)
  // },[])
  return <div className='Home'>
    <ConnectButton/>
    <div className="App">
      {CurrentConfig.rpc.mainnet === '' && (
        <h2 className="error">Please set your mainnet RPC URL in config.ts</h2>
      )}
      {CurrentConfig.env === Environment.WALLET_EXTENSION &&
        getProvider() === null && (
          <h2 className="error">
            Please install a wallet to use this example configuration
          </h2>
        )}
      <h3>
        Trading {CurrentConfig.tokens.amountIn} {CurrentConfig.tokens.in.symbol}{' '}
        for {CurrentConfig.tokens.out.symbol}
      </h3>
      <h3>{trade && `Constructed Trade: ${displayTrade(trade)}`}</h3>
      <button onClick={onCreateTrade}>
        <p>Create Trade</p>
      </button>
      <h3>{`Wallet Address: ${getWalletAddress()}`}</h3>
      {CurrentConfig.env === Environment.WALLET_EXTENSION &&
        !getWalletAddress() && (
          <button onClick={onConnectWallet}>Connect Wallet</button>
        )}
      <h3>{`Block Number: ${blockNumber + 1}`}</h3>
      <h3>{`Transaction State: ${txState}`}</h3>
      <h3>{`${CurrentConfig.tokens.in.symbol} Balance: ${tokenInBalance}`}</h3>
      <h3>{`${CurrentConfig.tokens.out.symbol} Balance: ${tokenOutBalance}`}</h3>
      <button
        onClick={() => wrapETH(100)}
        disabled={getProvider() === null || CurrentConfig.rpc.mainnet === ''}>
        <p>Wrap ETH</p>
      </button>
      <button
        onClick={() => onTrade(trade)}
        disabled={
          trade === undefined ||
          txState === TransactionState.Sending ||
          getProvider() === null ||
          CurrentConfig.rpc.mainnet === ''
        }>
        <p>Trade</p>
      </button>
    </div>
    </div>
}
export default Home;