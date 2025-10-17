'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Milestone {
  id: number;
  title: string;
  amount: number;
  status: 'PENDING' | 'IN_REVIEW' | 'APPROVED' | 'PAID';
  dueDate: string;
  reportSubmitted?: string;
}

export default function ProjektStatus() {
  // Mock data - params used for future dynamic loading
  const [project] = useState({
    name: 'Grön Framtid - Skolträdgård',
    organization: 'Miljöföreningen Stockholm',
    totalAmount: 50000,
    serviceFee: 3500,
    status: 'IN_PROGRESS'
  });

  const [milestones] = useState<Milestone[]>([
    {
      id: 1,
      title: 'Projektstart & planering',
      amount: 15000,
      status: 'PAID',
      dueDate: '2025-02-15',
      reportSubmitted: '2025-02-10'
    },
    {
      id: 2,
      title: 'Material & installation',
      amount: 20000,
      status: 'IN_REVIEW',
      dueDate: '2025-03-30',
      reportSubmitted: '2025-03-28'
    },
    {
      id: 3,
      title: 'Slutrapport & utvärdering',
      amount: 15000,
      status: 'PENDING',
      dueDate: '2025-05-15'
    }
  ]);

  const getStatusColor = (status: Milestone['status']) => {
    switch (status) {
      case 'PAID': return 'bg-green-100 text-green-800';
      case 'IN_REVIEW': return 'bg-yellow-100 text-yellow-800';
      case 'APPROVED': return 'bg-blue-100 text-blue-800';
      case 'PENDING': return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = (status: Milestone['status']) => {
    switch (status) {
      case 'PAID': return 'Betald';
      case 'IN_REVIEW': return 'Granskas';
      case 'APPROVED': return 'Godkänd';
      case 'PENDING': return 'Väntar';
    }
  };

  const paidAmount = milestones
    .filter(m => m.status === 'PAID')
    .reduce((sum, m) => sum + m.amount, 0);

  const progress = (paidAmount / project.totalAmount) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/foretag-dashboard" className="text-gray-600 hover:text-gray-900 mb-4 inline-block">
            ← Tillbaka till dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.name}</h1>
          <p className="text-gray-600">{project.organization}</p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Projektframsteg</h2>
            <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className="bg-gray-900 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Utbetalt</p>
              <p className="text-xl font-bold text-gray-900">{paidAmount.toLocaleString('sv-SE')} kr</p>
            </div>
            <div>
              <p className="text-gray-600">I escrow</p>
              <p className="text-xl font-bold text-gray-900">{(project.totalAmount - paidAmount).toLocaleString('sv-SE')} kr</p>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Delmål</h2>
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-gray-300">{String(index + 1).padStart(2, '0')}</span>
                    <h3 className="text-lg font-semibold text-gray-900">{milestone.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Förfallodatum: {new Date(milestone.dueDate).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900 mb-2">{milestone.amount.toLocaleString('sv-SE')} kr</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(milestone.status)}`}>
                    {getStatusText(milestone.status)}
                  </span>
                </div>
              </div>

              {milestone.reportSubmitted && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Rapport inlämnad</p>
                      <p className="text-xs text-gray-600">
                        {new Date(milestone.reportSubmitted).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                    {milestone.status === 'IN_REVIEW' && (
                      <Link
                        href={`/granska-rapport/${milestone.id}`}
                        className="text-sm text-gray-900 font-medium hover:underline"
                      >
                        Granska rapport →
                      </Link>
                    )}
                    {milestone.status === 'PAID' && (
                      <span className="text-sm text-green-600 font-medium">✓ Verifierad & betald</span>
                    )}
                  </div>
                </div>
              )}

              {milestone.status === 'PENDING' && !milestone.reportSubmitted && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">Väntar på att föreningen lämnar in rapport</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Sammanfattning</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Totalt bidrag</span>
              <span className="font-medium">{project.totalAmount.toLocaleString('sv-SE')} kr</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Serviceavgift (7%)</span>
              <span className="font-medium">{project.serviceFee.toLocaleString('sv-SE')} kr</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-300">
              <span className="font-semibold text-gray-900">Totalt betalat</span>
              <span className="font-bold text-gray-900">{(project.totalAmount + project.serviceFee).toLocaleString('sv-SE')} kr</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
