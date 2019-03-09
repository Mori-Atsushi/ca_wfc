import * as React from 'react';
import styled from 'styled-components';
import Search from '@material-ui/icons/Search';

interface IProps {
  onChange(query: string): void;
  value: string;
}

export default ({ onChange, value }: IProps) => (
  <Wrapper>
    <Input
      type="text"
      onChange={e => onChange(e.target.value)}
      value={value}
    />
    <Icon />
  </Wrapper>
);

const Wrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  display: block;
  font-size: 1.2rem;
  border-radius: 20000px;
  border: 1px #cccccc solid;
  width: 100%;
  outline: 0;
  padding: 0.5rem 2rem 0.5rem 3rem;
  box-sizing: border-box;
`;

const Icon = styled(Search)`
  color: #666666;
  position: absolute;
  top: 0;
  left: 1rem;
  bottom: 0;
  margin: auto;
`;
