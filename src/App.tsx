
import PreLoader from './components/PreLoader';
import TypeBox from './components/TypeBox';
import './index.css'; // Ensure this is the correct path to your Tailwind CSS file



const App = () => {
  return (
    <div>
      <PreLoader />
      <TypeBox />
    </div>
  )
}

export default App