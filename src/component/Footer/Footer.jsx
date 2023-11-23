import React from "react";
import * as ST from "./style";
import { FaInstagramSquare, FaFacebookF, FaGithub } from "react-icons/fa";
import { FaXTwitter, FaThreads } from "react-icons/fa6";

const Footer = () => {
  return (
    <ST.FooterBoxDiv>
      <ST.FooterContainerDiv>
        <ST.FooterInfoDiv>
          <p className="FooterInfoDetailP">Desert Shop</p>
          <p className="FooterInfoDetailP">FAQ</p>
          <p className="FooterInfoDetailP">CONTACT</p>
          <p className="FooterInfoDetailP">서울 강남구 테헤란로44길 8 12층</p>
        </ST.FooterInfoDiv>
        <br />
        <br />
        <ST.FooterSNSContainerDiv>
          <ST.FooterSNSDiv>
            <FaInstagramSquare />
          </ST.FooterSNSDiv>
          <ST.FooterSNSDiv>
            <FaFacebookF />
          </ST.FooterSNSDiv>
          <ST.FooterSNSDiv>
            <FaXTwitter />
          </ST.FooterSNSDiv>
          <ST.FooterSNSDiv>
            <FaGithub />
          </ST.FooterSNSDiv>
          <ST.FooterSNSDiv>
            <FaThreads />
          </ST.FooterSNSDiv>
        </ST.FooterSNSContainerDiv>
      </ST.FooterContainerDiv>
    </ST.FooterBoxDiv>
  );
};

export default Footer;
