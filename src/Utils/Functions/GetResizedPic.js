const GetResizedPic = (num) => {
  console.log(num);
  switch (num) {
    case 1: {
      return "/assets/tab-bg1rs.webp";
    }
    case 2: {
      return "/assets/tab-bg2rs.webp";
    }
    case 3: {
      return "/assets/tab-bg3rs.webp";
    }
    case 4: {
      return "/assets/tab-bg4rs.webp";
    }
    case 5: {
      return "/assets/tab-bg5rs.webp";
    }
    case 6: {
      return "/assets/tab-bg6rs.webp";
    }
    case 7: {
      return "/assets/tab-bg7rs.webp";
    }
    default: {
      return false;
    }
  }
};

export default GetResizedPic;
