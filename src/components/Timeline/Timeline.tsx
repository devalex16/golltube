import StyledTimeline from './StyleTimeline.tsx';

type TimeProps = {
  list?: array;
  search?: string;
}

export default function Timeline({search, list}: TimeProps) {
  const playlistNames = Object.keys(list)
  return (
    <StyledTimeline>
      {playlistNames.map((listNames) => {
        const videos = list[listNames]
        return (
          <section key={listNames}>
            <h2>{listNames}</h2>
            <div>
              {videos.filter((video) => {
                const videosNormalized = video.title.toLowerCase()
                const searchNormalized = search.toLowerCase()
                return videosNormalized.includes(searchNormalized)
              }).map((videos) => {
                return (
                  <a key={videos} href={videos.url} target="_blank" rel="external">
                    <img src={videos.thumb}/>
                    <span>
                      {videos.title}
                    </span>
                  </a>
                )
              })}
            </div>
          </section>
        )
      })}
    </StyledTimeline>
  )
}
