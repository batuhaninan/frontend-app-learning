import React, { useEffect } from 'react';
import { render } from 'react-dom';
import { LearningHeader as Header } from '@edx/frontend-component-header';
import Footer from '@edx/frontend-component-footer';


const replaceHrefFooter = () => {
  useEffect(() => {
    const links = document.querySelectorAll('footer a');
    links.forEach((link) => {
      link.setAttribute('href', 'https://pupilica.com');
    });

  }, []);

  return null; // Return null as we don't need to render anything
};

const FooterWrapper = () => {
  replaceHrefFooter(); // Call the replaceHref function to modify the href attributes

  return (
    <Footer/>
  );
};
export default FooterWrapper;
