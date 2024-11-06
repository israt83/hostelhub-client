import Marquee from "react-fast-marquee";
// import logo1 from "../../assets/images/logo.png"
import img1 from "../../assets/images/Partner/p1.png"
import img2 from "../../assets/images/Partner/p2.png"
import img3 from "../../assets/images/Partner/p3.png"
import img4 from "../../assets/images/Partner/p4.png"

const Partnership = () => {
    return (
        <div
        data-aos="zoom-in"
        data-aos-delay="1000 "
        data-aos-duration="1500"
        className=" "

      >
        <Marquee pauseOnHover={true}>
          <div className=" gap-16 md:gap-32 flex my-10">
       
            <img src={img1} alt="" />
            <img src={img2} alt="" />
            
            <img src={img3} alt="" />
            <img src={img1} alt="" />
            <img src={img4} alt="" />
         
          </div>
        </Marquee>
      </div>
    );
};

export default Partnership;