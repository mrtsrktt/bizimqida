import React from 'react';

export function FlagIcon({ locale }: { locale: string }) {
  if (locale === 'tr') {
    return (
      <svg width="20" height="15" viewBox="0 0 640 480" style={{ borderRadius: '2px', display: 'inline-block', verticalAlign: 'middle' }}>
        <path fill="#e30a17" d="M0 0h640v480H0z" />
        <path fill="#fff" d="M407 240a120 120 0 1 1-204.8-84.8A140 140 0 1 0 407 240z" />
        <path fill="#e30a17" d="M417 240a96 96 0 1 1-163.8-67.8A112 112 0 1 0 417 240z" />
        <path fill="#fff" d="m444 200 13 40 41-13-25 33 26 33-41-13-14 40-14-40-41 13 26-33-26-33 41 13z" />
      </svg>
    );
  }
  if (locale === 'az') {
    return (
      <svg width="20" height="15" viewBox="0 0 1200 600" style={{ borderRadius: '2px', display: 'inline-block', verticalAlign: 'middle' }}>
        <path fill="#00b5e2" d="M0 0h1200v200H0z" />
        <path fill="#ef3340" d="M0 200h1200v200H0z" />
        <path fill="#509e2e" d="M0 400h1200v200H0z" />
        <circle cx="570" cy="300" r="90" fill="#fff" />
        <circle cx="595" cy="300" r="75" fill="#ef3340" />
        <path fill="#fff" d="M670 300l-30.8 12.8 12.8 30.8-30.8-12.8-12.8 30.8-12.8-30.8-30.8 12.8 12.8-30.8-12.8-30.8 30.8 12.8 12.8-30.8 12.8 30.8z" />
      </svg>
    );
  }
  if (locale === 'en') {
    return (
      <svg width="20" height="15" viewBox="0 0 600 300" style={{ borderRadius: '2px', display: 'inline-block', verticalAlign: 'middle' }}>
        <path fill="#012169" d="M0 0h600v300H0z" />
        <path stroke="#fff" strokeWidth="60" d="M0 0l600 300M600 0L0 300" />
        <path stroke="#C8102E" strokeWidth="40" d="M0 0l600 300M600 0L0 300" />
        <path stroke="#fff" strokeWidth="100" d="M300 0v300M0 150h600" />
        <path stroke="#C8102E" strokeWidth="60" d="M300 0v300M0 150h600" />
      </svg>
    );
  }
  if (locale === 'ru') {
    return (
      <svg width="20" height="15" viewBox="0 0 900 600" style={{ borderRadius: '2px', display: 'inline-block', verticalAlign: 'middle' }}>
        <path fill="#fff" d="M0 0h900v200H0z" />
        <path fill="#0039a6" d="M0 200h900v200H0z" />
        <path fill="#d52b1e" d="M0 400h900v200H0z" />
      </svg>
    );
  }
  return null;
}
