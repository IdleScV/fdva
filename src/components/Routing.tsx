import { Box } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

import { publicRoutes } from "./Routes";

// import RequireAuth from "../auth/RequireAuth";
// import Breadcrumbs from "../components/Breadcrumbs";
// import Header from "../components/Header";
// import ErrorPage from "../pages/ErrorPage";

function Routings() {
  const location = useLocation();

  const variants = {
    initial: { opacity: 0, x: 1000 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -1000 },
  };

  const transition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4,
  };

  return (
    <Box position="relative" zIndex={0}>
      <AnimatePresence exitBeforeEnter>
        {/* <AnimateSharedLayout> */}
        {/* <Breadcrumbs /> */}
        <Box height="64px">
          <Header key={location.pathname} />
        </Box>
      </AnimatePresence>
      <AnimatePresence exitBeforeEnter initial={false}>
        <Routes key={location.pathname} location={location}>
          {publicRoutes.map(({ element, ...publicRouteProps }) => (
            <Route
              {...publicRouteProps}
              element={
                <>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={variants}
                    transition={transition}
                    key={publicRouteProps.path as string}
                  >
                    {element}
                  </motion.div>
                </>
              }
              key={publicRouteProps.path as string}
            />
          ))}
          {/* 
                        <Route path="*" element={<ErrorPage />} /> */}
        </Routes>
      </AnimatePresence>
      <Footer />
      {/* </AnimateSharedLayout> */}
    </Box>
  );
}

export default Routings;
