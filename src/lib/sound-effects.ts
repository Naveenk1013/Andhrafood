"use client";

/**
 * Modern Futuristic Audio Engine for Ruchi AI Prompt Interactions
 * Built with Web Audio API for zero-latency, offline synthesis without external audio files.
 */
class RuchiAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Modern, futuristic, clean chime when focusing/entering the AI prompt box.
   * Dual-harmonic crystalline chime with a gentle lowpass envelope.
   */
  public playPromptEnterChime() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // Master gain for entering sound
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.exponentialRampToValueAtTime(0.09, now + 0.02);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);

      // Resonant Lowpass Filter for modern sleek glass texture
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1400, now);
      filter.frequency.exponentialRampToValueAtTime(3800, now + 0.08);
      filter.frequency.exponentialRampToValueAtTime(800, now + 0.4);
      filter.Q.setValueAtTime(2.2, now);

      // Primary tone: Warm fundamental harmonic (E5 -> G#5)
      const osc1 = ctx.createOscillator();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(659.25, now); // E5
      osc1.frequency.exponentialRampToValueAtTime(830.61, now + 0.12); // G#5

      // Secondary tone: Crystalline shimmer (B5 -> E6)
      const osc2 = ctx.createOscillator();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(987.77, now + 0.03); // B5
      osc2.frequency.exponentialRampToValueAtTime(1318.51, now + 0.16); // E6

      const osc2Gain = ctx.createGain();
      osc2Gain.gain.setValueAtTime(0.001, now);
      osc2Gain.gain.setValueAtTime(0.001, now + 0.03);
      osc2Gain.gain.exponentialRampToValueAtTime(0.045, now + 0.05);
      osc2Gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);

      // Routing
      osc1.connect(filter);
      osc2.connect(osc2Gain);
      osc2Gain.connect(filter);
      filter.connect(masterGain);
      masterGain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now + 0.03);

      osc1.stop(now + 0.45);
      osc2.stop(now + 0.45);
    } catch {
      // AudioContext gracefully fails silently if blocked by user policy
    }
  }

  /**
   * Futuristic activation pulse when sending a message
   */
  public playSendChime() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.001, now);
      master.gain.exponentialRampToValueAtTime(0.1, now + 0.015);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.15); // D6

      osc.connect(master);
      master.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {}
  }

  /**
   * Crisp micro-click for mode toggles
   */
  public playToggleClick() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.001, now);
      master.gain.exponentialRampToValueAtTime(0.05, now + 0.005);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

      osc.connect(master);
      master.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {}
  }
}

export const ruchiAudio = new RuchiAudioEngine();
