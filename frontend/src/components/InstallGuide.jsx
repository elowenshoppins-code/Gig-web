import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Download, CheckCircle2, Settings, FolderOpen, Shield, Smartphone, AlertCircle, HelpCircle, ArrowLeft, Play } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || window.location.origin;

export const InstallGuide = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [apkAvailable, setApkAvailable] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    checkApkAvailability();
  }, []);

  const checkApkAvailability = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/apk/apk-info`);
      setApkAvailable(response.data.exists);
    } catch (error) {
      console.error('Error checking APK:', error);
      setApkAvailable(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadAPK = () => {
    if (apkAvailable) {
      window.location.href = `${BACKEND_URL}/api/apk/download-apk`;
    }
  };

  const steps = [
    {
      number: 1,
      icon: Download,
      image: "https://static.prod-images.emergentagent.com/jobs/aa0ab5d0-9838-4f15-bb1a-a79f19432776/images/f58aaf749344c8a419158ab6ca412c362a8c799029a856032b4d8a8b1386f38d.png",
      title: t('install.step1.title'),
      description: t('install.step1.description'),
      tip: t('install.step1.tip')
    },
    {
      number: 2,
      icon: Settings,
      image: "https://static.prod-images.emergentagent.com/jobs/aa0ab5d0-9838-4f15-bb1a-a79f19432776/images/fc342192a326e9a7f26d0c933ecc45f0f00669dac91f550530e09c22a9dc1290.png",
      title: t('install.step2.title'),
      description: t('install.step2.description'),
      tip: t('install.step2.tip'),
      details: [
        t('install.step2.detail1'),
        t('install.step2.detail2'),
        t('install.step2.detail3'),
        t('install.step2.detail4')
      ]
    },
    {
      number: 3,
      icon: FolderOpen,
      image: "https://static.prod-images.emergentagent.com/jobs/aa0ab5d0-9838-4f15-bb1a-a79f19432776/images/f58aaf749344c8a419158ab6ca412c362a8c799029a856032b4d8a8b1386f38d.png",
      title: t('install.step3.title'),
      description: t('install.step3.description'),
      tip: t('install.step3.tip')
    },
    {
      number: 4,
      icon: Shield,
      image: "https://static.prod-images.emergentagent.com/jobs/aa0ab5d0-9838-4f15-bb1a-a79f19432776/images/cd4ea75f0adea0f1796c8dcac65acdfde0ccfb8ccec7a09eac9c531787383936.png",
      title: t('install.step4.title'),
      description: t('install.step4.description'),
      tip: t('install.step4.tip')
    },
    {
      number: 5,
      icon: CheckCircle2,
      image: "https://static.prod-images.emergentagent.com/jobs/aa0ab5d0-9838-4f15-bb1a-a79f19432776/images/ddad435ce80d117ae20a0fc8c6a4c05c6992712549cb0ba2f54b67c49bab895a.png",
      title: t('install.step5.title'),
      description: t('install.step5.description'),
      tip: t('install.step5.tip')
    }
  ];

  const problems = [
    {
      icon: Shield,
      title: t('install.problem1.title'),
      solution: t('install.problem1.solution')
    },
    {
      icon: FolderOpen,
      title: t('install.problem2.title'),
      solution: t('install.problem2.solution')
    },
    {
      icon: AlertCircle,
      title: t('install.problem3.title'),
      solution: t('install.problem3.solution')
    },
    {
      icon: AlertCircle,
      title: t('install.problem4.title'),
      solution: t('install.problem4.solution')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0f172a] to-[#1e293b] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6 text-cyan-400 hover:text-cyan-300"
          >
            <ArrowLeft className="mr-2" size={18} />
            {t('install.backToHome')}
          </Button>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-white">{t('install.title')} </span>
            <span className="text-gradient">{t('install.titleHighlight')}</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {t('install.subtitle')}
          </p>
        </div>

        {/* Download Button */}
        {apkAvailable && (
          <div className="mb-12 text-center">
            <Card className="bg-[#1e293b] border-2 border-cyan-500/50 p-6 inline-block">
              <Button
                onClick={handleDownloadAPK}
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-green-400 hover:from-cyan-600 hover:to-green-500 text-white font-bold px-8 py-6 text-lg"
              >
                <Download className="mr-2" size={24} />
                {t('install.downloadAgain')}
              </Button>
            </Card>
          </div>
        )}

        {/* Video Tutorial Section (Placeholder) */}
        <Card className="bg-[#1e293b] border-2 border-cyan-500/30 p-6 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-cyan-500/20 p-3 rounded-full">
              <Play className="text-cyan-400" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{t('install.videoTitle')}</h3>
              <p className="text-sm text-gray-400">{t('install.videoSubtitle')}</p>
            </div>
          </div>
          <div className="bg-[#0f172a] rounded-lg p-8 text-center border border-cyan-500/20">
            <Play className="text-cyan-400 mx-auto mb-2" size={48} />
            <p className="text-gray-400">Video tutorial coming soon</p>
          </div>
        </Card>

        {/* Installation Steps */}
        <div className="space-y-8 mb-16">
          {steps.map((step, index) => (
            <Card 
              key={index}
              className="bg-[#1e293b] border-2 border-cyan-500/30 hover:border-cyan-500/50 transition-all p-6 lg:p-8"
            >
              <div className="grid lg:grid-cols-[200px,1fr] gap-6 items-start">
                {/* Image */}
                <div className="flex justify-center lg:justify-start">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-green-400/20 rounded-2xl blur-xl"></div>
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="relative w-40 h-40 object-contain rounded-2xl"
                    />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-green-400 flex items-center justify-center text-white font-bold text-xl">
                      {step.number}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-gray-300 leading-relaxed mb-3">
                        {step.description}
                      </p>
                      
                      {/* Details List */}
                      {step.details && (
                        <ul className="space-y-2 mb-3">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                              <CheckCircle2 className="text-green-400 flex-shrink-0 mt-0.5" size={16} />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Tip */}
                      <div className="flex items-start gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
                        <AlertCircle className="text-cyan-400 flex-shrink-0 mt-0.5" size={16} />
                        <p className="text-sm text-cyan-200">
                          <span className="font-semibold">Tip:</span> {step.tip}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Troubleshooting Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-6 py-3 mb-4">
              <HelpCircle className="text-yellow-400" size={24} />
              <h2 className="text-2xl font-bold text-white">{t('install.troubleshooting.title')}</h2>
            </div>
            <p className="text-gray-400">{t('install.troubleshooting.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {problems.map((problem, index) => {
              const Icon = problem.icon;
              return (
                <Card 
                  key={index}
                  className="bg-[#1e293b] border-2 border-yellow-500/30 p-6"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="bg-yellow-500/20 p-2 rounded-lg flex-shrink-0">
                      <Icon className="text-yellow-400" size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-white">{problem.title}</h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {problem.solution}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Contact Section */}
        <Card className="bg-gradient-to-br from-cyan-500/10 to-green-400/10 border-2 border-cyan-500/50 p-8 text-center">
          <HelpCircle className="text-cyan-400 mx-auto mb-4" size={48} />
          <h3 className="text-2xl font-bold text-white mb-2">{t('install.needHelp')}</h3>
          <p className="text-gray-300 mb-4">
            {t('install.contactUs')}{' '}
            <a 
              href="mailto:support@gigzipfinder.com"
              className="text-cyan-400 hover:text-cyan-300 font-semibold underline"
            >
              support@gigzipfinder.com
            </a>
          </p>
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/20"
          >
            <ArrowLeft className="mr-2" size={18} />
            {t('install.backToHome')}
          </Button>
        </Card>

      </div>
    </div>
  );
};
