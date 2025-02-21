/*
    Copyright 2024 Hartbeat Track Club. All rights reserved.
    This file or parts thereof may not be reproduced in any form, stored in any retrieval system,
    or transmitted in any form by any means—electronic, mechanical, photocopy, recording, or
    otherwise, without prior written permission of Hartbeat Track Club, except as provided by
    United States of America copyright law and fair use.
    */

import { CustomHbLink, ImageCarousel } from '../../components';
import { EmblaOptionsType } from 'embla-carousel';
import { navLinks } from '../../constants/navlinks';
import { useFormerAthletes, useTeamAthleteData } from '../../hooks';
import { SkeletonLoaderCell, ErrorMessage } from '../../ui';
import teamPic1 from '../../assets/images/carousel/team_pic_1.webp';
import teamPic2 from '../../assets/images/carousel/team_pic_2.webp';
import teamPic3 from '../../assets/images/carousel/team_pic_3.webp';
import teamPic4 from '../../assets/images/carousel/team_pic_4.webp';
import teamPic5 from '../../assets/images/carousel/team_pic_5.webp';
import teamPic6 from '../../assets/images/carousel/team_pic_6.webp';
import teamPic7 from '../../assets/images/carousel/team_pic_7.webp';
import teamPic8 from '../../assets/images/carousel/team_pic_8.webp';
import teamPic9 from '../../assets/images/carousel/team_pic_9.webp';
import teamPic10 from '../../assets/images/carousel/team_pic_10.webp';
import { styles } from '../../ui/table';

const images = [
  teamPic1,
  teamPic2,
  teamPic3,
  teamPic4,
  teamPic5,
  teamPic6,
  teamPic7,
  teamPic8,
  teamPic9,
  teamPic10,
];

const OPTIONS: EmblaOptionsType = { align: 'start', loop: true };

const Team = () => {
  const { teamData, loading, error } = useTeamAthleteData();
  const { formerAthletes, formerAthleteLoading, formerAthleteError } =
    useFormerAthletes();
  const categorizedAthletes = teamData?.categorizedAthletes ?? {};
  const maxRows = teamData?.maxRows ?? 0;

  const allNavLinks = navLinks();
  const teamLink = allNavLinks.find((link) => link.name === 'Team');
  const teamSubLinks = teamLink && teamLink.subLinks ? teamLink.subLinks : [];
  return (
    <div className='w-full bg-slate-100'>
      <ImageCarousel slides={images} options={OPTIONS} />
      <div className='flex flex-col gap-4 w-full items-center'>
        <h1 className='text-6xl tracking-widest font-bold'>Meet the Team</h1>
        <ul className='flex w-full justify-center items-start gap-4'>
          {teamSubLinks.map((link, i) => (
            <CustomHbLink key={i} to={link.path}>
              {link.name}
            </CustomHbLink>
          ))}
        </ul>
        <div className='flex flex-col w-full justify-center items-center max-w-7xl'>
          <h2>CURRENT ROSTER</h2>
          <p>
            <em>* Masters Athlete</em>
          </p>
          <table className='w-full max-w-7xl mx-auto min-w-full leading-normal'>
            <thead>
              <tr className={styles.tRow}>
                <th className={styles.tHead}>Men</th>
                <th className={styles.tHead}>Non-Binary</th>
                <th className={styles.tHead}>Women</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    <SkeletonLoaderCell />
                    <SkeletonLoaderCell />
                    <SkeletonLoaderCell />
                  </tr>
                ))
              ) : error ? (
                <tr>
                  <td colSpan={3}>
                    <ErrorMessage message='Failed to load team data. Please try again.' />
                  </td>
                </tr>
              ) : (
                Array.from({ length: maxRows }).map((_, rowIndex) => (
                  <tr key={rowIndex} className=''>
                    <td className={styles.tD}>
                      <p className={styles.tPar}>
                        {categorizedAthletes?.male?.[rowIndex]
                          ? `${categorizedAthletes.male[rowIndex].firstName} ${categorizedAthletes.male[rowIndex].lastName}`
                          : ''}
                      </p>
                    </td>
                    <td className={styles.tD}>
                      <p className={styles.tPar}>
                        {categorizedAthletes?.['non-binary']?.[rowIndex]
                          ? `${categorizedAthletes?.['non-binary'][rowIndex].firstName} ${categorizedAthletes?.['non-binary'][rowIndex].lastName}`
                          : ''}
                      </p>
                    </td>
                    <td className={styles.tD}>
                      <p className={styles.tPar}>
                        {categorizedAthletes?.female?.[rowIndex]
                          ? `${categorizedAthletes.female[rowIndex].firstName} ${categorizedAthletes.female[rowIndex].lastName}`
                          : ''}
                      </p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div>
          <table className='w-full max-w-7xl mx-auto min-w-full leading-normal'>
            <thead>
              <tr className={styles.tRow}>
                <th className={styles.tHead} colSpan={2}>
                  Alumni and Friends
                </th>
              </tr>
            </thead>
            <tbody>
              {formerAthleteLoading ? (
                Array.from({ length: 5 }).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    <SkeletonLoaderCell />
                  </tr>
                ))
              ) : formerAthleteError ? (
                <tr>
                  <td colSpan={3}>
                    <ErrorMessage message='Failed to load team data. Please try again.' />
                  </td>
                </tr>
              ) : (
                formerAthletes?.map((athlete, index) => (
                  <tr key={index}>
                    <td className={styles.tD} colSpan={2}>
                      <p className={styles.tPar}>
                        {`${athlete.firstName} ${athlete.lastName}`}
                      </p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Team;
