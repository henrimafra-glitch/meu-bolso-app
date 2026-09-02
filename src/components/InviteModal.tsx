import React, { useState } from 'react';
import { Family } from '../types';
import { X, Copy, Check, Users, ShieldAlert } from 'lucide-react';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  family: Family;
}

export const InviteModal: React.FC<InviteModalProps> = ({ isOpen, onClose, family }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const inviteLink = `${window.location.origin}?invite=${family.invite_code}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
              <Users className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
              Convidar para {family.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Compartilhe o código ou link de convite com seu cônjuge, parceiro(a) ou filhos para ingressarem no mesmo núcleo financeiro:
        </p>

        {/* Código de Convite */}
        <div className="mb-3">
          <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
            Código de Acesso
          </label>
          <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-center font-mono font-bold text-base tracking-widest text-brand-700 dark:text-brand-400 border border-slate-200 dark:border-slate-700">
            {family.invite_code}
          </div>
        </div>

        {/* Link Copiável */}
        <div className="mb-4">
          <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
            Link Direto de Convite
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="text"
              readOnly
              value={inviteLink}
              className="w-full text-xs px-2.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 font-mono truncate"
            />
            <button
              onClick={handleCopy}
              className="px-3 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado' : 'Copiar'}</span>
            </button>
          </div>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200/70 dark:border-slate-800 flex items-start gap-2 text-[11px] text-slate-500">
          <ShieldAlert className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
          <span>
            Ao aceitar o convite, o novo membro terá acesso às transações e orçamentos coletivos da casa conforme seu papel.
          </span>
        </div>
      </div>
    </div>
  );
};
