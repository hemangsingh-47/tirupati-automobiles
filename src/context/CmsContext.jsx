import { createContext, useState, useEffect, useContext } from 'react';
import { cmsService } from '../services/cms.service';
import { teamService } from '../services/team.service';

const CmsContext = createContext();

export const CmsProvider = ({ children }) => {
  const [content, setContent] = useState(null);
  const [services, setServices] = useState([]);
  const [team, setTeam] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCmsData = async () => {
    try {
      const [contentData, servicesData, teamData, faqData] = await Promise.all([
        cmsService.getContent(),
        cmsService.getServices(),
        teamService.getTeam(),
        cmsService.getFaqs()
      ]);

      setContent(contentData);
      setServices(servicesData);
      setTeam(teamData);
      setFaqs(faqData);
    } catch (error) {
      console.error('Failed to fetch CMS data', error);
      // Fallbacks
      setContent({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCmsData();
  }, []);

  return (
    <CmsContext.Provider value={{ content, services, team, faqs, loading, refreshCms: fetchCmsData }}>
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => useContext(CmsContext);
