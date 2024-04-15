import { ConnectButton } from '@rainbow-me/rainbowkit';
import '../assets/styles/Home.scss'
import { useWriteContract } from 'wagmi'
import { useAccount } from 'wagmi'
import earthFlyLine from "earth-flyline";
import geojson from '../assets/Map/World.json'
import { useEffect } from 'react';
earthFlyLine.registerMap("world", geojson);

const Home = () => {
  const writeContract = useWriteContract()
  const account = useAccount()
  console.log(account)
  console.log(writeContract);
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
    <ConnectButton />
    <div id="container"></div>
  </div>
}
export default Home;