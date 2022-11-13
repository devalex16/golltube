import {useContext, useState, useEffect} from 'react';
import dados from '../config.json';
import Header from './components/Header/Header.tsx';
import Timeline from './components/Timeline/Timeline.tsx';
import Menu from './components/Menu/Menu.tsx';
import CSSReset from './components/style/CSS_Reset.tsx';
import { ThemeProvider } from 'styled-components';
import ColorModeProvider, { ColorModeContext } from './utils/ColorModeProvider.tsx';
import FormRegister from './components/Form/Form.tsx';
import { createClient } from '@supabase/supabase-js';

const PROJECT_URL = "https://pwsvemwckigdxzvkbquc.supabase.co"
const PROJECT_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3c3ZlbXdja2lnZHh6dmticXVjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2ODI2NzkyNCwiZXhwIjoxOTgzODQzOTI0fQ.ZPQtyhUK_E00XiEQ9urNhWVYkp_Dw-eFpzhaVycbHbE"
const supabase = createClient(PROJECT_URL, PROJECT_KEY)

function ProviderWrapper(props){
  return (
    <ColorModeProvider initialMode={"dark"}>
      {props.children}
    </ColorModeProvider>
  )
}

function HomePage() {
  const context =  useContext(ColorModeContext)
  const [valueFilter, setValueFilter] = useState("")
  const [playlist, setPlaylist]  = useState({})

  useEffect(() =>{
    supabase.from('video')
    .select('*')
    .then((dados) => {
      //dados.data: pega todos os Arrays
      const newList = {...playlist}
      dados.data.forEach((video) => {
        //video: pega title, thumb, url ..
        if(!newList[video.playlist]){
          newList[video.playlist] = []
        }
      newList[video.playlist].push(video)
      })
      //seta na PlayList!
      setPlaylist(newList)
    });
  }, [])
  
  
  const theme = { 
     light: { 
         backgroundBase: "#ECF3FF",
         backgroundLevel1: "#D6E5FF",
         backgroundLevel2: "#B9D3FF", 
         borderBase: "#e5e5e5", 
         textColorBase: "#222222", 
     }, 
     dark: { 
         backgroundBase: "#141B27", 
         backgroundLevel1: "#141F31",
         backgroundLevel2: "#313131", 
         borderBase: "#383838", 
         textColorBase: "#FFFFFF", 
     } 
  };
  
  return (
      <ThemeProvider theme={theme[context.mode]}>
        <CSSReset />
        <Menu valueFilter={valueFilter} setValueFilter={setValueFilter} />
        <Header />
        <Timeline search={valueFilter} list={playlist} />
        <FormRegister />
      </ThemeProvider>   
  )
}

export default function _App() {
   return (
     <ProviderWrapper>
       <HomePage />
     </ProviderWrapper>
   )
}

