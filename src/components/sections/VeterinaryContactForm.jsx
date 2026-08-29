import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, Loader2, PawPrint, Send } from 'lucide-react';
import { emailjsService } from '@/services/emailjsService';
import { useLanguage } from '@/hooks/useLanguage';

const NEXT_STEP_KEYS = ['profile', 'comparison', 'reply'];
const ANIMAL_IMAGES = {
  dog: '/images/veterinary/animal-dog.webp',
  cat: '/images/veterinary/animal-cat.webp',
  horse: '/images/veterinary/animal-horse.webp',
};
const FIELD_CLASS = 'h-12 rounded-xl border-[#cabfa9] bg-white/75 text-[#10272d] shadow-none focus-visible:border-[#25c990] focus-visible:ring-[#25c990]/25';
const SELECT_CLASS = 'h-12 w-full rounded-xl border border-[#cabfa9] bg-white/75 px-3 text-sm text-[#10272d] outline-none transition focus:border-[#25c990] focus:ring-2 focus:ring-[#25c990]/25';

const VeterinaryContactForm = ({ selection, onSelectionChange }) => {
  const { t } = useTranslation('veterinary');
  const { getPath } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    animal_type: selection.animalType || '',
    coverage: selection.coverage || '',
    breed: '',
    age: '',
    usage: '',
    privacyAccepted: false,
  });

  useEffect(() => {
    setFormData((current) => ({
      ...current,
      animal_type: selection.animalType || current.animal_type,
      coverage: selection.coverage || current.coverage,
    }));
  }, [selection.animalType, selection.coverage]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const nextValue = type === 'checkbox' ? checked : value;
    setFormData((current) => ({ ...current, [name]: nextValue }));

    if (name === 'animal_type') {
      onSelectionChange((current) => ({ ...current, animalType: value }));
    }
    if (name === 'coverage') {
      onSelectionChange((current) => ({ ...current, coverage: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const animalLabel = t(`finder.animals.${formData.animal_type}.title`);
    const coverageLabel = t(`finder.coverage.${formData.coverage}.title`);

    try {
      await emailjsService.sendEmail({
        from_name: formData.name,
        from_email: formData.email,
        phone: '',
        company: '',
        message: [
          `Tierart: ${animalLabel}`,
          `Gewünschter Schutz: ${coverageLabel}`,
          `Alter: ${formData.age}`,
          `Rasse: ${formData.breed || 'nicht angegeben'}`,
          formData.animal_type === 'horse' ? `Nutzung: ${formData.usage}` : null,
        ].filter(Boolean).join('\n'),
      }, 'Tierkrankenversicherung – Tarifprüfung');

      toast({
        title: t('form.successTitle'),
        description: t('form.successText'),
      });

      setFormData((current) => ({
        name: '',
        email: '',
        animal_type: current.animal_type,
        coverage: current.coverage,
        breed: '',
        age: '',
        usage: '',
        privacyAccepted: false,
      }));
    } catch (error) {
      toast({
        title: t('form.errorTitle'),
        description: t('form.errorText'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const animalSummary = formData.animal_type
    ? t(`finder.animals.${formData.animal_type}.title`)
    : t('finder.profile.animalEmpty');
  const coverageSummary = formData.coverage
    ? t(`finder.coverage.${formData.coverage}.title`)
    : t('finder.profile.coverageEmpty');
  const animalImage = ANIMAL_IMAGES[formData.animal_type];
  const profileReady = Boolean(formData.animal_type && formData.coverage);

  return (
    <section id="vet-contact" className="relative scroll-mt-20 overflow-hidden bg-[#071827] py-20 sm:py-24 lg:py-28" aria-labelledby="vet-form-title">
      <div className="absolute -left-48 top-0 h-[34rem] w-[34rem] rounded-full bg-[#25c990]/10 blur-[120px]" aria-hidden="true" />
      <div className="absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full border border-white/[0.05]" aria-hidden="true" />

      <div className="healio-container relative px-4 sm:px-6 md:px-8">
        <div className="mb-12 max-w-4xl sm:mb-16">
          <p className="font-display text-xs font-extrabold uppercase tracking-[0.23em] text-[#76e2bd]">{t('form.eyebrow')}</p>
          <h2 id="vet-form-title" className="mt-4 max-w-[18ch] font-display text-[clamp(2.45rem,5vw,4.8rem)] font-extrabold leading-[0.98] tracking-[-0.055em] text-[#fffdf8] [text-wrap:balance]">
            {t('form.title')}
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">{t('form.subtitle')}</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-16">
          <div className="order-2 lg:order-1">
            <div className="relative mx-auto max-w-[410px] px-2 pb-5">
              <div className="absolute inset-x-6 bottom-0 top-6 rotate-3 rounded-[2.25rem] bg-[#25c990]/15" aria-hidden="true" />
              <article className="relative rotate-[-1.2deg] overflow-hidden rounded-[2rem] bg-[#f8efdc] shadow-[0_30px_80px_rgba(0,0,0,0.38)]">
                <header className="flex items-center justify-between bg-[#0d332e] px-6 py-4 text-white">
                  <span className="font-display text-[0.65rem] font-extrabold uppercase tracking-[0.22em]">{t('finder.profile.passTitle')}</span>
                  <span className="font-friendly text-sm font-bold text-[#8ee7ca]">Healio</span>
                </header>

                <div className="relative h-[250px] overflow-hidden bg-[radial-gradient(circle_at_50%_32%,#ffffff_0%,#ede4d2_54%,#d6c29b_100%)]">
                  <span className="absolute left-5 top-5 rounded-full bg-white/70 px-3 py-1 font-display text-[0.58rem] font-extrabold uppercase tracking-[0.15em] text-[#0a654c] backdrop-blur-sm">
                    {profileReady ? t('finder.profile.statusReady') : t('finder.profile.statusOpen')}
                  </span>
                  {animalImage ? (
                    <img
                      src={animalImage}
                      alt={animalSummary}
                      width="640"
                      height="640"
                      className="absolute bottom-[-10%] left-1/2 h-[108%] w-auto max-w-none -translate-x-1/2 object-contain drop-shadow-[0_22px_24px_rgba(31,38,33,0.25)]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PawPrint className="h-28 w-28 text-[#173b36]/12" />
                    </div>
                  )}
                </div>

                <div className="px-6 pb-6 pt-5 sm:px-7">
                  <p className="font-display text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-[#71817d]">{t('form.profileLabel')}</p>
                  <div className="mt-2 flex items-end justify-between gap-4">
                    <p className="font-friendly text-3xl font-bold leading-none text-[#10272d]">{animalSummary}</p>
                    <p className="text-right font-display text-sm font-extrabold text-[#087451]">{coverageSummary}</p>
                  </div>
                  <div className="mt-5 h-px border-t-2 border-dotted border-[#173b36]/20" aria-hidden="true" />
                  <p className="mt-4 text-xs leading-relaxed text-[#6b716a]">{t('finder.disclaimer')}</p>
                </div>
              </article>
            </div>

            <div className="mt-10 max-w-[440px]">
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-[#76e2bd]">{t('form.next.eyebrow')}</p>
              <h3 className="mt-3 font-friendly text-3xl font-bold leading-tight text-white">{t('form.next.title')}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{t('form.next.text')}</p>
              <ol className="mt-7 border-t border-white/15">
                {NEXT_STEP_KEYS.map((key, index) => (
                  <li key={key} className="grid grid-cols-[38px_1fr] gap-2 border-b border-white/15 py-4 text-sm leading-relaxed text-slate-200">
                    <span className="font-display text-xs font-extrabold text-[#76e2bd]">{String(index + 1).padStart(2, '0')}</span>
                    <span>{t(`form.next.steps.${key}`)}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="order-1 rounded-[2rem] bg-[#f8efdc] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.32)] sm:p-8 lg:order-2 lg:p-10">
            <div className="flex items-center justify-between gap-5 border-b border-[#8f7e5d]/20 pb-5">
              <div>
                <p className="font-display text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-[#087451]">{t('form.profileLabel')}</p>
                <p className="mt-1 font-friendly text-xl font-bold text-[#10272d]">{animalSummary} · {coverageSummary}</p>
              </div>
              <span className="hidden h-11 w-11 rotate-6 items-center justify-center rounded-full border-2 border-[#25a77d]/25 font-friendly text-sm font-bold text-[#087451] sm:flex" aria-label={profileReady ? t('finder.profile.statusReady') : t('finder.profile.statusOpen')}>
                {profileReady ? 'OK' : '–'}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="vet-name" className="font-display text-xs font-bold text-[#334a4e]">{t('form.fields.name')}</Label>
                  <Input id="vet-name" name="name" autoComplete="name" required value={formData.name} onChange={handleChange} className={FIELD_CLASS} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vet-email" className="font-display text-xs font-bold text-[#334a4e]">{t('form.fields.email')}</Label>
                  <Input id="vet-email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} className={FIELD_CLASS} />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="animal_type" className="font-display text-xs font-bold text-[#334a4e]">{t('form.fields.animal')}</Label>
                  <select id="animal_type" name="animal_type" required value={formData.animal_type} onChange={handleChange} className={SELECT_CLASS}>
                    <option value="">{t('form.fields.select')}</option>
                    <option value="dog">{t('finder.animals.dog.title')}</option>
                    <option value="cat">{t('finder.animals.cat.title')}</option>
                    <option value="horse">{t('finder.animals.horse.title')}</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coverage" className="font-display text-xs font-bold text-[#334a4e]">{t('form.fields.coverage')}</Label>
                  <select id="coverage" name="coverage" required value={formData.coverage} onChange={handleChange} className={SELECT_CLASS}>
                    <option value="">{t('form.fields.select')}</option>
                    <option value="full">{t('finder.coverage.full.title')}</option>
                    <option value="surgery">{t('finder.coverage.surgery.title')}</option>
                    <option value="unsure">{t('finder.coverage.unsure.title')}</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="vet-age" className="font-display text-xs font-bold text-[#334a4e]">{t('form.fields.age')}</Label>
                  <Input id="vet-age" name="age" type="number" min="0" max="60" required value={formData.age} onChange={handleChange} className={FIELD_CLASS} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vet-breed" className="font-display text-xs font-bold text-[#334a4e]">{t('form.fields.breed')}</Label>
                  <Input id="vet-breed" name="breed" value={formData.breed} onChange={handleChange} className={FIELD_CLASS} />
                </div>
              </div>

              {formData.animal_type === 'horse' && (
                <div className="border-y border-[#a97a2f]/25 bg-[#f3e5c7] px-1 py-5">
                  <Label htmlFor="vet-usage" className="font-display text-xs font-bold text-[#665128]">{t('form.fields.usage')}</Label>
                  <Input id="vet-usage" name="usage" required value={formData.usage} onChange={handleChange} placeholder={t('form.fields.usagePlaceholder')} className={`${FIELD_CLASS} mt-2 border-[#c6aa73]`} />
                  <p className="mt-2 text-xs leading-relaxed text-[#766a4d]">{t('form.fields.usageNote')}</p>
                </div>
              )}

              <label className="flex cursor-pointer items-start gap-3 border-t border-[#8f7e5d]/20 pt-5 text-xs leading-relaxed text-[#5f6965]">
                <input
                  type="checkbox"
                  name="privacyAccepted"
                  required
                  checked={formData.privacyAccepted}
                  onChange={handleChange}
                  className="mt-0.5 h-4 w-4 rounded border-[#a89b82] text-[#087451] focus:ring-[#25c990]"
                />
                <span>
                  {t('form.privacyPrefix')}{' '}
                  <Link to={getPath('datenschutz')} className="font-bold text-[#087451] underline decoration-[#25c990]/50 underline-offset-2 hover:text-[#065c41]">
                    {t('form.privacyLink')}
                  </Link>.
                </span>
              </label>

              <Button type="submit" disabled={isSubmitting} className="h-auto w-full rounded-full bg-[#25c990] px-6 py-4 font-display text-base font-extrabold text-[#062319] shadow-[0_16px_34px_rgba(37,201,144,0.23)] hover:bg-[#5ee0b1]">
                {isSubmitting ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> {t('form.sending')}</>
                ) : (
                  <><Send className="mr-2 h-5 w-5" /> {t('form.submit')}</>
                )}
              </Button>

              <p className="flex items-start justify-center gap-2 text-center text-xs leading-relaxed text-[#6a736e]">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#087451]" />
                {t('form.responseNote')}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VeterinaryContactForm;
