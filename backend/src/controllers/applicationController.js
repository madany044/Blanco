import prisma from "../config/prisma.js";

const upsertApplication = async (userId, payload, status) => {
  const existing = await prisma.application.findUnique({
    where: { userId },
  });

  const mappedData = {
    nativePlace: payload.nativePlace,
    highestQualification: payload.highestQualification,
    teklaYears: payload.teklaYears,
    aiscExperience: payload.aiscExperience,
    editingExperience: payload.editingExperience,
    checkingExperience: payload.checkingExperience,
    modelingExperience: payload.modelingExperience,
    leadExperience: payload.leadExperience,
    technicalSkills: payload.technicalSkills,
    basisForInterview: payload.basisForInterview,
    companiesWorked: payload.companiesWorked,
    currentSalary: payload.currentSalary,
    lastIncrementDate: payload.lastIncrementDate
      ? new Date(payload.lastIncrementDate)
      : null,
    reasonForLeaving: payload.reasonForLeaving,
    expectedSalary: payload.expectedSalary,
    noticePeriod: payload.noticePeriod,
    additionalComments: payload.additionalComments,
    status,
  };

  if (existing) {
    return prisma.application.update({
      where: { userId },
      data: mappedData,
    });
  }

  return prisma.application.create({
    data: {
      ...mappedData,
      userId,
    },
  });
};


export const saveDraft = async (req, res) => {
  try {
    const application = await upsertApplication(req.user.id, req.body, "DRAFT");
    return res.json({ application });
  } catch (err) {
    return res.status(500).json({ message: "Unable to save draft" });
  }
};

export const submit = async (req, res) => {
  try {
    const application = await upsertApplication(
      req.user.id,
      req.body,
      "SUBMITTED"
    );
    return res.json({ application });
  } catch (error) {
  console.error("SUBMIT APPLICATION ERROR:", error);
  return res.status(500).json({ 
    message: "Failed to submit application",
    error: error.message
  });
  }
}

export const getMine = async (req, res) => {
  try {
    const application = await prisma.application.findUnique({
      where: { userId: req.user.id },
      include: {
        user: { select: { name: true, email: true, contactNumber: true } },
      },
    });
    if (!application) return res.json({ application: null });
    return res.json({ application });
  } catch (err) {
    return res.status(500).json({ message: "Unable to fetch application" });
  }
};

