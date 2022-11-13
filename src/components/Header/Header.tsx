import dados from '../../../config.json';
import StyledHeader from './StyleHeader.tsx';
import styled from 'styled-components';

const StyledBanner = styled.div`
  background: url(${({ bgImage}) => bgImage});
  background-size: cover;
  height: 200px;
  width: 100vw;
  box-shadow: 0px 0px 10px black inset;
`;

export default function Header() {
  return (
    <StyledHeader>
      <StyledBanner bgImage={dados.bg} />
      <section className="user">
        <img src={`https://github.com/${dados.github}.png`} />
        <div>
          <h2>
            {dados.name}
          </h2>
          <p>
            {dados.job}
          </p>
        </div>
      </section>
    </StyledHeader>
  )
}