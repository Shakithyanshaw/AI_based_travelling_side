import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Screen from './Components/Screen';
import ResponsiveAppBar from './Components/ResponsiveAppBar';
import Chat from './Components/Chat';
import Hotel from './Components/Hotel';
import './index.css';
import Restaurant from './Components/Restaurant';
import ImageSearch from './Components/ImageSearch';
import Form from './Components/Form';
function App() {
  return (
    <div className="App">
      <Router>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Screen />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
          <Route path="/hotel" element={<Hotel />}></Route>
          <Route path="/restaurant" element={<Restaurant />}></Route>
          <Route path="/imagesearch" element={<ImageSearch />}></Route>
          <Route path="/form" element={<Form />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
