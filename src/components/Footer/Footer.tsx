import React from 'react'
import { Footer as FooterType } from '@/payload-types'
import { isValidPayloadItem } from '@/utils/isValidPayloadItem'
import { isValidImage } from '@/utils/isValidImage'
import Link from 'next/link'
type Props = FooterType

export const Footer = ({ footerLinks, copyrightText, socialLinks, logo }: Props) => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="col-span-1">
            {logo && (
              <img
                src={isValidImage(logo) ? logo.url : ''}
                alt="Footer Logo"
                className="h-12 w-auto"
              />
            )}
          </div>

          {/* Footer Links */}
          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-8">
              {footerLinks?.map((link, i) => (
                <Link
                  key={i}
                  href={isValidPayloadItem(link.footerLink) ? link.footerLink.url : '#'}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {isValidPayloadItem(link.footerLink) ? link.footerLink.label : ''}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="col-span-1">
            <div className="flex space-x-4">
              {socialLinks?.map((social, i) => (
                <Link
                  key={i}
                  href={social.url}
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.platform}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          {copyrightText}
        </div>
      </div>
    </footer>
  )
}
