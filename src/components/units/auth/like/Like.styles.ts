import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Title = styled.div`
  font-size: 1.5rem;
  margin-top: 1rem;
  margin-left: 10%;
  padding: 0px 25px 0 25px;
`;

export const Table = styled.section`
  display: flex;
  flex-direction: column;
  width: 90%;
  padding: 2px 100px 0px 100px;
  margin: 0 auto;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  height: 52px;
  line-height: 52px;
  border-bottom: 1px solid gray;
  cursor: pointer;

  :hover {
    color: #ffa000;
  }
`;

export const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  height: 52px;
  line-height: 52px;
  border-bottom: 2px solid gray;
`;

export const ColumnHeaderNumber = styled.div`
  width: 8%;
  font-weight: 700;
  text-align: center;
`;

export const ColumnHeaderBasic = styled.div`
  width: 20%;
  font-weight: 700;
  text-align: center;
`;

export const ColumnHeaderTitle = styled.div`
  width: 40%;
  font-weight: 700;
  text-align: center;
`;

export const ColumnNumber = styled.div`
  width: 10%;
  text-align: center;
`;

export const ColumnBasic = styled.div`
  width: 20%;
  text-align: center;
`;

export const ColumnImage = styled.img`
  width: 40px;
  height: 40px;
`;

export const ColumnTitle = styled.div`
  width: 40%;
  text-align: center;
  cursor: pointer;

  :hover {
    color: orange;
  }
`;
