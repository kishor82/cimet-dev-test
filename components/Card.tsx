import React from "react";
import styled from "styled-components";
import { getCleanText } from "../lib";
import Link from "next/link";
import { FaInfoCircle, FaLightbulb, FaSun } from "react-icons/fa";

import DOMPurify from "dompurify";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const StyledPoint = styled.div`
  display: inline-block;
  margin: 5px;
`;

const StyledCol = styled.div``;

const StyledButton = styled.button`
  flex-basis: 100%;
  padding: 10px;
  color: #ffff;
  background-color: #2d0c74;
  border: none;
  cursor: pointer;
  font-weight: bold;
  border-radius: 15px;
`;

const StyledThirdRow = styled.div`
  display: flex;
  border-radius: 5px;
  width: 100%;
  background-color: #f5f5f5;
  gap: 10px;
  padding: 10px;
  align-items: baseline;
`;

const Styled90Col = styled.div`
  flex-basis: 100%;
  @media (min-width: 768px) {
    flex-basis: 90%;
  }
`;

const PointsContainer = styled.div`
  max-width: 450px;
  padding: 20px;
  text-align: center;
`;

const Styled10Col = styled.div`
  flex-basis: 100%;
  font-size: small;
  @media (min-width: 768px) {
    flex-basis: 20%;
  }
`;

const CardContainer = styled.fieldset`
  background-color: #ffffff;
  max-width: 1020px;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin: 15px;
  border: 1px solid #8c8c8c;
`;

const LegendTag = styled.legend`
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
  background-color: #f5f5f5;
  padding: 5px 10px;
  color: #8c8c8c;
  margin: 0px 5px;
  font-size: small;
  border-radius: 5px;
`;

const TagContainer = styled.legend`
  display: flex;
  flex-direction: row;
  background-color: transparent;
  position: absolute;
  margin-top: -40px;
  font-size: small;
  font-weight: 600;
  border-radius: 5px;
  background-color: transparent;
  padding: 10px 0px;
`;

const InfoContainer = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
`;

const PercentageContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const SpanContainer = styled.div`
  display: flex;
  flex: 1;
  width: 40%;
  padding: 10px;
  border-radius: 5px;
  align-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  background-color: #f5f5f5;
  justify-content: center;
`;

const CostContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 150px;
  border-radius: 5px;
  overflow: hidden;
`;

const EstimatedCost = styled.div`
  color: #ffff;
  font-size: smaller;
  background-color: #3153a0;
  align-content: center;
  padding: 10px;
`;

const PriceContainer = styled.div`
  background-color: #c6e8ea;
  display: flex;
  flex-direction: column;
  font-size: smaller;
  color: #858b8c;
  padding: 10px;
`;

const YearlyCost = styled.span`
  font-size: large;
  color: #2d0c74;
  font-weight: bold;
`;

const MonthlyCost = styled.span`
  font-size: medium;
  color: #2d62a6;
  font-weight: 600;
`;

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  max-width: 150px;
  height: auto;
`;

const MainContainer = styled.div`
  align-content: center;
  display: flex;
  justify-content: center;
  position: relative;
`;

const StyledLink = styled.a`
  color: #2aaaee;
  text-decoration: none;
  font-weight: 600;
  padding: 5px;
  font-size: small;
`;

export interface IData {
  id: string;
  title: string;
  description: string;
  features;
  planName: string;
  provider_image: string;
  provider_name: string;
  dmo_content: {
    Ausgrid: string;
  };
  dmo_percentage: {
    Ausgrid: string;
  };
  plan_name_below_data: string;
  why_us: string;
  energy_type: string;
  solar_compatible: string;
  view_discount: string;
  view_benefit: string;
  view_bonus: string;
  view_contract: string;
  view_exit_fee: string;
  expected_bill_amount: number;
  expected_monthly_bill_amount: number;
}

export const Card = ({
  data: {
    provider_image,
    provider_name,
    dmo_content,
    dmo_percentage,
    plan_name_below_data,
    solar_compatible,
    energy_type,
    view_benefit,
    view_bonus,
    view_contract,
    view_exit_fee,
    expected_bill_amount,
    expected_monthly_bill_amount
  }
}: {
  data: IData;
}) => {
  const points = [view_benefit, view_bonus, view_contract, view_exit_fee];
  return (
    <MainContainer>
      <CardContainer>
        <TagContainer>
          {energy_type === "electricity" && (
            <LegendTag energyType={energy_type}>
              <FaLightbulb />
              &nbsp; Electricity
            </LegendTag>
          )}

          {solar_compatible == "yes" && (
            <LegendTag>
              <FaSun />
              &nbsp; Solar
            </LegendTag>
          )}
        </TagContainer>
        <StyledContainer>
          <StyledRow>
            <StyledCol>
              <ImageContainer>
                <Img src={provider_image} alt={provider_name} />
                <Link prefetch href={"#"} passHref>
                  <StyledLink>View Details</StyledLink>
                </Link>
                <Link prefetch href={"#"} passHref>
                  <StyledLink>Basic Plan Information Document</StyledLink>
                </Link>
              </ImageContainer>
            </StyledCol>
            <StyledCol>
              <InfoContainer>
                <PercentageContainer>
                  <SpanContainer>
                    <span>{dmo_percentage.Ausgrid} </span>
                    <span>{plan_name_below_data}</span>
                  </SpanContainer>
                </PercentageContainer>

                <PointsContainer>
                  {points
                    .filter((item) => !!item)
                    .map((point, index) => (
                      <StyledPoint key={`points-${index}`}>
                        &#10004; {getCleanText(point)}
                      </StyledPoint>
                    ))}
                </PointsContainer>
              </InfoContainer>
            </StyledCol>
            <StyledCol>
              <CostContainer>
                <EstimatedCost>
                  Estimated cost <FaInfoCircle />
                </EstimatedCost>
                <PriceContainer>
                  <div>
                    <YearlyCost>${expected_bill_amount}^</YearlyCost>/yr
                  </div>
                  <div>
                    <MonthlyCost>${expected_monthly_bill_amount}</MonthlyCost>
                    /mo
                  </div>
                </PriceContainer>
              </CostContainer>
            </StyledCol>
          </StyledRow>
          <StyledRow>
            <div
              dangerouslySetInnerHTML={{
                __html: dmo_content.Ausgrid
              }}
            />
          </StyledRow>
          <StyledThirdRow>
            <Styled90Col>
              <div>
                <StyledPoint>
                  &#10004; 10 business days cooling off period
                </StyledPoint>
                <StyledPoint>&#10004; Secure signup in 5 mins</StyledPoint>
                <StyledPoint>&#10004; Save time and effort</StyledPoint>
              </div>
              <div style={{ fontSize: "smaller", padding: "5px" }}>
                ^The estimated includes any applicable welcome credits, bonuses,
                and conditional discounts (if applicable) which apply within the
                first 12 months of the plan
              </div>
            </Styled90Col>
            <Styled10Col>
              <StyledButton>Connect Online Today</StyledButton>
            </Styled10Col>
          </StyledThirdRow>
        </StyledContainer>
      </CardContainer>
    </MainContainer>
  );
};
