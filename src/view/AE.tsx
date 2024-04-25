import '../assets/styles/AE.scss'
import lottie, { AnimationItem } from 'lottie-web';
import animationData from "../assets/AE/data.json"; //引入你的json动画数据
import { useEffect, useRef } from 'react';

const AE = () => {
    const container = useRef<HTMLDivElement | null>(null);
    const Animation = useRef<AnimationItem | null>(null);
    useEffect(() => {
        if (container) {
            Animation.current = lottie.loadAnimation({
                container: container.current as Element,
                renderer: "svg",
                name: "        ",
                loop: false, //循环
                autoplay: false, //自动播放
                // assetsPath: "images/",
                // animationData: animationData,//动画数据
                animationData: JSON.parse(JSON.stringify(animationData))
            })
            // Animation.current.addEventListener("complete", () => {
            //     Animation.current?.destroy();
            // });
            return () => { Animation.current?.destroy() }
        }
    }, [])
    const startUp = () => {
        if (!Animation.current) {
            return
        }
        Animation.current.playSegments([30, 90], false)
        Animation.current.addEventListener("complete", () => {
            Animation.current?.playSegments([30, 90], false)
        });
    }
    const stop= () =>{
        if (!Animation.current) {
            return
        }
        Animation.current.goToAndStop(10,true)
    }

    return (<>
        <div ref={container} className='animation'>
        </div>
        <button onClick={startUp}>启动</button>
        <button onClick={stop}>停止</button>
    </>
    )
}
export default AE;