export interface Certificate {
  id: string;
  userId: string;
  userName: string;
  trailId: string;
  trailSlug: string;
  trailTitle: string;
  issuedAt: string;
  code: string;
  pdfUrl: string;
  revoked: boolean;
}

export type CertificateVerifyStatus = 'valid' | 'revoked' | 'not_found';

export interface CertificateVerifyResult {
  status: CertificateVerifyStatus;
  code?: string;
  issuedAt?: string;
  trailTitle?: string;
  holder?: string;
}
