import prisma from "../config/prisma.js";

/**
 * Common select used across admin APIs
 * IMPORTANT:
 * - Use ONLY with `select`
 * - NEVER use with `include`
 */
const baseSelect = {
  id: true,
  status: true,
  adminNotes: true,
  createdAt: true,
  updatedAt: true,
  teklaYears: true,
  expectedSalary: true,
  user: {
    select: {
      id: true,
      name: true,
      email: true,
      contactNumber: true,
    },
  },
};

/**
 * ✅ LIST APPLICATIONS (Admin Dashboard)
 * GET /api/admin/applications
 */
export const listApplications = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    status,
    minExperience,
  } = req.query;

  const skip = (Number(page) - 1) * Number(limit);

  const filters = {};
  if (status) filters.status = status;
  if (minExperience) {
    filters.teklaYears = { gte: Number(minExperience) };
  }

  const searchFilter = search
    ? {
        OR: [
          {
            user: {
              name: { contains: search, mode: "insensitive" },
            },
          },
          {
            user: {
              contactNumber: { contains: search },
            },
          },
        ],
      }
    : {};

  try {
    const [items, total] = await Promise.all([
      prisma.application.findMany({
        where: { ...filters, ...searchFilter },
        select: baseSelect,
        orderBy: { createdAt: "desc" },
        skip,
        take: Number(limit),
      }),
      prisma.application.count({
        where: { ...filters, ...searchFilter },
      }),
    ]);

    return res.json({
      applications: items,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (err) {
    console.error("ADMIN LIST ERROR >>>", err);
    return res.status(500).json({
      message: "Unable to fetch applications",
    });
  }
};

/**
 * ✅ GET SINGLE APPLICATION (Admin View Page)
 * GET /api/admin/applications/:id
 */
export const getApplicationById = async (req, res) => {
  const { id } = req.params;

  try {
    const application = await prisma.application.findUnique({
      where: { id: Number(id) },
      select: {
        ...baseSelect,
        nativePlace: true,
        highestQualification: true,
        aiscExperience: true,
        editingExperience: true,
        checkingExperience: true,
        modelingExperience: true,
        leadExperience: true,
        technicalSkills: true,
        basisForInterview: true,
        companiesWorked: true,
        currentSalary: true,
        lastIncrementDate: true,
        reasonForLeaving: true,
        noticePeriod: true,
        additionalComments: true,
      },
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    return res.json({ application });
  } catch (err) {
    console.error("ADMIN VIEW ERROR >>>", err);
    return res.status(500).json({
      message: "Failed to fetch application",
    });
  }
};

/**
 * ✅ UPDATE APPLICATION STATUS
 * PATCH /api/admin/applications/:id/status
 */
export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const application = await prisma.application.update({
      where: { id: Number(id) },
      data: { status },
      select: baseSelect,
    });

    return res.json({ application });
  } catch (err) {
    console.error("ADMIN STATUS UPDATE ERROR >>>", err);
    return res.status(500).json({
      message: "Unable to update status",
    });
  }
};

/**
 * ✅ UPDATE ADMIN NOTES
 * PATCH /api/admin/applications/:id/notes
 */
export const updateNotes = async (req, res) => {
  const { id } = req.params;
  const { adminNotes } = req.body;

  try {
    const application = await prisma.application.update({
      where: { id: Number(id) },
      data: { adminNotes },
      select: baseSelect,
    });

    return res.json({ application });
  } catch (err) {
    console.error("ADMIN NOTES UPDATE ERROR >>>", err);
    return res.status(500).json({
      message: "Unable to update notes",
    });
  }
};
