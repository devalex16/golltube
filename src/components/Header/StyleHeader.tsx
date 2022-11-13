import styled from 'styled-components';

const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.backgroundLevel1};
  img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }
  .user {
   display: flex;
   align-items: center;
   width: 100%;
   padding: 16px 32px;
   gap: 16px;
  }
`;

export default StyledHeader;