import React from "react";
import styled from "styled-components";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const Loader = () => {
  return (
    <LoaderContainer>
      <h3>Loading...</h3>
    </LoaderContainer>
  );
};
