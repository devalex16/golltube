import { useState } from 'react';
import StyledForm from './StyleForm.tsx';
import { createClient } from '@supabase/supabase-js';

const PROJECT_URL = "https://pwsvemwckigdxzvkbquc.supabase.co"
const PROJECT_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3c3ZlbXdja2lnZHh6dmticXVjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2ODI2NzkyNCwiZXhwIjoxOTgzODQzOTI0fQ.ZPQtyhUK_E00XiEQ9urNhWVYkp_Dw-eFpzhaVycbHbE"
const supabase = createClient(PROJECT_URL, PROJECT_KEY)

/*NOSSO PRÓPRIO HOOK*/
function useForm(props) {
  const [values, setValues] = useState(props.initialValues)

  return {
    values,
    handleChange: (e) => {
      const value = e.target.value
      const name = e.target.name
      setValues({
         ...values,
        [name]: value,
      })
    },
    convertVideo(url) {
      const videoId = url.split("v=")[1]
      setValues({
        ...values,     
        ["thumb"]: videoId
      })
      console.log(values)
    }
  }
}

export default function FormRegister() {
  const [block, setBlock] = useState<boolean>(false)
  const form = useForm({
    initialValues: { titulo:"",
    url:"", thumb:"", playlist:""}
  })
   return (
     <StyledForm>
       <button className="add-video" onClick={() => {setBlock(true)}}>
         +
       </button>
       {block
            ? (
              <form>
                <div>
                  <button className="close-modal" onClick={() => {setBlock(false)}}>
                    X
                  </button>
                  <input placeholder="Título do vídeo" name="titulo" value={form.values.titulo} onChange={form.handleChange}/>
                  <input placeholder="URL do vídeo" name="url" value={form.values.url} onChange={form.handleChange} />
                  <input placeholder="Nome da Playlist" name="playlist" value={form.values.playlist} onChange={form.handleChange} />
                  <button type="submit"  onClick={(e) => {
                e.preventDefault()
                  form.convertVideo(form.values.url)
          supabase.from("video").insert({
            //Atualiza os dados do Banco
            title: form.values.titulo,
            url: form.values.url,
            thumb: `https://img.youtube.com/vi/${form.values.url.split("v=")[1]}/hqdefault.jpg`,
            playlist: form.values.playlist,
          })
           .then((res) => {
             console.log(res)
           })
           .catch((err) => {
             console.log(err)
           })
                  }}>
                    Submit
                  </button>
                  <div>
                    <h2>Demonstração:</h2>
                    <img src={`https://img.youtube.com/vi/${form.values.thumb}/hqdefault.jpg`}/>
                    <h2>{form.values.titulo}</h2>
                  </div>
                </div>  
              </form>
            )
            : false
       }    
     </StyledForm>
   )
}

