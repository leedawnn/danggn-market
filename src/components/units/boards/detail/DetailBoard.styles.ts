import styled from '@emotion/styled';
import { CgProfile } from 'react-icons/cg';
import { GrLike, GrDislike } from 'react-icons/gr';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 50px 100px;
  flex-wrap: wrap;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  border: 1px solid #e5e5e5;
  box-shadow: 0px 4px 16px 0px #00000033;
  padding: 10px 100px;
`;

export const UserInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
  line-height: 25px;
  padding: 20px;
  border-bottom: 1px solid #bdbdbd;
`;

export const ProfilePhoto = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 20px;
`;

export const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
`;

export const UserName = styled.span`
  font-size: 20px;
  font-weight: 500;
`;

export const CreatedDate = styled.span`
  color: #828282;
  font-size: 12px;
  font-weight: 400;
`;

export const BoardContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  width: 100%;
  min-height: 700px;
  padding: 20px 0px;
`;

export const Title = styled.h1`
  color: #000000;
`;

export const ImageWrapper = styled.div`
  max-width: 790px;
  display: flex;
  flex-direction: column;
`;

export const Image = styled.img`
  height: 480px;
  margin-bottom: 30px;
`;

export const Content = styled.p`
  font-size: 14px;
  font-weight: 400;
`;

export const BoardLike = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-between;
  padding: 30px;
  cursor: pointer;
`;

export const LikesWrapper = styled.div`
  width: 80px;
  display: flex;
  justify-content: space-evenly;
`;

export const LikeIcon = styled(GrLike)`
  font-size: 20px;
`;

export const LikeCount = styled.div`
  color: #ffd600;
`;

export const DisLikeIcon = styled(GrDislike)`
  font-size: 20px;
`;

export const DisLikeCount = styled.div`
  color: #828282;
`;

export const BtnWrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #bdbdbd;
  margin: 80px 0 10px 0;
  padding-bottom: 80px;
`;

export const Button = styled.button`
  width: 180px;
  height: 45px;
  font-weight: 500;
  margin-right: 10px;
  border: 1px solid #bdbdbd;
  background-color: #ffffff;
  cursor: pointer;
`;
