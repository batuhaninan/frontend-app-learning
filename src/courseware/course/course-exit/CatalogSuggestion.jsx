import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { getConfig } from '@edx/frontend-platform';
import {getAuthenticatedHttpClient, getAuthenticatedUser} from '@edx/frontend-platform/auth';
import {
  FormattedMessage, injectIntl, intlShape,
} from '@edx/frontend-platform/i18n';
import { Hyperlink } from '@edx/paragon';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useModel } from '../../../generic/model-store';

import messages from './messages';
import { logClick } from './utils';

function CatalogSuggestion({ intl, variant }) {
  const [isCertificateEnabled, setCertificateEnabled] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const { courseId } = useSelector(state => state.courseware);
  const { org } = useModel('courseHomeMeta', courseId);
  const { administrator } = getAuthenticatedUser();
  const url = `http://local.overhang.io/user/certificate/${courseId}`;


  useEffect(() => {
      setLoading(true)
      const fetchData = async () => {
      const data = await courseHasCertificate();
      setCertificateEnabled(data)
    }
    fetchData()
        .then()
        .catch(console.error)
        .finally(() => setLoading(false));
  }, []);

  const courseHasCertificate =  async () => {
    let url = `${getConfig().LMS_BASE_URL}/courses/${courseId}/hasCertificate`;
    const { data } = await getAuthenticatedHttpClient().get(url);
    const result = await data.json();
    return result["has_certificate"]
  }

  const downloadCertificateLink = (
    <Hyperlink
      style={{ textDecoration: 'underline' }}
      destination={url}
      className="text-reset"
      onClick={() => logClick(org, courseId, administrator, 'catalog_search', { variant })}
    >
      Sertifikanı
    </Hyperlink>
  );

  if (isLoading) {
    return <div>...</div>
  }

  return (
    isCertificateEnabled &&
    <div className="row w-100 mx-0 my-2 justify-content-center" data-testid="catalog-suggestion">
      <div className="col col-md-8 p-4 bg-info-100 text-center">
        <i data-rating="1" class="smile-icon-star-checked" aria-hidden="true" style={{ width: '20px' }} ></i>&nbsp;
        <FormattedMessage
          id="courseExit.catalogSearchSuggestion"
          defaultMessage="{downloadCertificateLink} görmeye ne dersin? :)"
          values={{ downloadCertificateLink }}
          description="Sertifika"
        />
      </div>
    </div>
  );
}

CatalogSuggestion.propTypes = {
  intl: intlShape.isRequired,
  variant: PropTypes.string.isRequired,
};

export default injectIntl(CatalogSuggestion);
