import React from 'react';

export const ColorModeContext = React.createContext({
  mode: "",
  setMode: () => { alert("alerta") }
})

function ColorModeProvider(props) {
  const [mode, setMode] = React.useState("light")

  return (
    <ColorModeContext.Provider value={{ mode: mode, setMode: setMode }}>
      {props.children}
    </ColorModeContext.Provider>
  )
}

export default ColorModeProvider;