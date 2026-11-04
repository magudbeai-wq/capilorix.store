import { useEffect } from 'react';
import { seoService } from '../services/seoService';

export default function SEOHead({ currentPath }) {
  useEffect(() => {
    seoService.applyMetadata(currentPath);
  }, [currentPath]);

  return null;
}
