/**
 * Deterministic LocalX Trust Score Calculator
 * Based on:
 * - Verification Status (+25 pts)
 * - Customer Rating (+35 pts)
 * - Completed Jobs Volume (+20 pts)
 * - Response Rate (+10 pts)
 * - Cancellation Reliability (+10 pts)
 */
function calculateTrustScore({
  verificationStatus = 'PENDING',
  rating = 0,
  completedJobs = 0,
  responseRate = 90,
  cancellationRate = 5,
}) {
  // 1. Verification Component (max 25)
  let verificationScore = 0;
  if (verificationStatus === 'VERIFIED') {
    verificationScore = 25;
  } else if (verificationStatus === 'PENDING') {
    verificationScore = 5;
  } else {
    verificationScore = 0;
  }

  // 2. Rating Component (max 35)
  // Rating is 1 to 5 stars
  const normalizedRating = Math.max(0, Math.min(5, Number(rating) || 0));
  const ratingScore = (normalizedRating / 5) * 35;

  // 3. Completed Jobs Component (max 20)
  let jobsScore = 0;
  if (completedJobs >= 50) {
    jobsScore = 20;
  } else if (completedJobs >= 25) {
    jobsScore = 16;
  } else if (completedJobs >= 10) {
    jobsScore = 12;
  } else if (completedJobs >= 5) {
    jobsScore = 8;
  } else if (completedJobs >= 1) {
    jobsScore = 4;
  }

  // 4. Response Rate Component (max 10)
  const normResponseRate = Math.max(0, Math.min(100, Number(responseRate) || 80));
  const responseScore = (normResponseRate / 100) * 10;

  // 5. Cancellation Rate Component (max 10)
  // Lower cancellation rate is better (0% = 10 pts, 10% = 5 pts, >= 20% = 0 pts)
  const normCancelRate = Math.max(0, Math.min(100, Number(cancellationRate) || 0));
  const cancelScore = Math.max(0, 10 - (normCancelRate / 2));

  const total = Math.round(
    verificationScore + ratingScore + jobsScore + responseScore + cancelScore
  );

  const clampedScore = Math.min(100, Math.max(0, total));

  // Determine Tier
  let tier = 'Newcomer';
  if (clampedScore >= 90) {
    tier = 'Elite Pro';
  } else if (clampedScore >= 75) {
    tier = 'Verified Master';
  } else if (clampedScore >= 60) {
    tier = 'Rising Pro';
  }

  return {
    score: clampedScore,
    tier,
    breakdown: {
      verification: Math.round(verificationScore),
      rating: Math.round(ratingScore),
      completedJobs: Math.round(jobsScore),
      responseRate: Math.round(responseScore),
      cancellationRate: Math.round(cancelScore),
    },
  };
}

module.exports = { calculateTrustScore };
