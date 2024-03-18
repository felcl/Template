import { ConnectButton } from '@rainbow-me/rainbowkit';
import '../assets/styles/Home.scss'
import { useAccount } from 'wagmi'

const Home = ()=>{
    const account = useAccount()
    console.log(account)
    return <div className='Home'>
        <ConnectButton/>
    </div>
}
export default Home;