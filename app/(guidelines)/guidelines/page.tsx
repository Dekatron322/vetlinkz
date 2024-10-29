"use client"
import DashboardNav from "components/Navbar/DashboardNav"
import "aos/dist/aos.css"
import DoctorDetail from "components/Dashboard/DoctorDetail"
import CasesDetails from "components/Dashboard/CasesDetail"

export default function Dashboard() {
  return (
    <section className="">
      <div className="  w-full">
        <div className="flex  w-full flex-col">
          <DashboardNav />
          <div className="flex ">
            <div className="flex w-full px-32 py-7 max-md:flex-col  max-md:px-0  max-sm:px-3 ">
              <div className="mx-auto my-8  rounded-lg bg-white p-4 shadow-sm">
                <h2 className="mb-4 text-2xl font-semibold">Guidelines And Best Practices</h2>

                <div className="space-y-6">
                  {/* User Onboarding & Authentication */}
                  <div>
                    <p className="clash-font">1. User Onboarding & Authentication</p>
                    <ul className="ml-6 mt-2 list-disc space-y-2">
                      <li className="clash-font">
                        Verification Process: Ensure that all veterinarians signing up as doctors on the platform are
                        authenticated by verifying their Veterinary Council of Nigeria (VCN) numbers or equivalent for
                        their country. Students should register using their institutional emails.
                      </li>
                      <li className="clash-font">
                        Profile Completion: Require doctors to complete their profiles, including their areas of
                        specialization, years of experience, and clinic affiliations. This helps in identifying who is
                        providing input on cases.
                      </li>
                    </ul>
                  </div>

                  {/* Case Submission Guidelines */}
                  <div>
                    <p className="clash-font">2. Case Submission Guidelines</p>
                    <ul className="ml-6 mt-2 list-disc space-y-2">
                      <li className="clash-font">Structured Case Format:</li>
                      <ul className="ml-6 mt-2 list-disc space-y-2">
                        <li className="clash-font">Case Title: Concise and descriptive.</li>
                        <li className="clash-font">
                          Patient Details: Age, breed, weight, sex, and any other relevant medical history.
                        </li>
                        <li className="clash-font">
                          Chief Complaint/Presenting Condition: Brief but informative, outlining the primary symptoms
                          and reason for the vet consultation.
                        </li>
                        <li className="clash-font">
                          Clinical Findings: Vital signs, physical exam findings, diagnostic test results (bloodwork,
                          imaging, etc.).
                        </li>
                        <li className="clash-font">
                          Differential Diagnoses: List the initial diagnostic considerations.
                        </li>
                        <li className="clash-font">
                          Treatment Plan: Step-by-step breakdown of the proposed or executed treatment.
                        </li>
                        <li className="clash-font">
                          Outcome: Share the follow-up details, improvement, or any complications.
                        </li>
                        <li className="clash-font">
                          Media Uploads: Include photos, X-rays, lab reports, and videos where applicable to illustrate
                          the case better.
                        </li>
                      </ul>
                      <li className="clash-font">
                        Anonymization of Client Data: Ensure that any information related to the pet owner is fully
                        anonymized to protect privacy.
                      </li>
                      <li className="clash-font">
                        Clarity and Precision: Cases should be presented clearly and include only medically relevant
                        information to avoid confusion.
                      </li>
                    </ul>
                  </div>

                  {/* Discussion & Critique Guidelines */}
                  <div>
                    <p className="clash-font">3. Discussion & Critique Guidelines</p>
                    <ul className="ml-6 mt-2 list-disc space-y-2">
                      <li className="clash-font">
                        Professional Language: Doctors must use professional, respectful language when discussing or
                        critiquing cases. Personal attacks or unprofessional remarks should result in warnings or
                        penalties.
                      </li>
                      <li className="clash-font">
                        Constructive Criticism: Comments should focus on providing constructive feedback. When pointing
                        out mistakes or alternative approaches, the critique should be based on evidence-based
                        veterinary medicine or personal professional experience.
                      </li>
                      <li className="clash-font">
                        Reference to Evidence: Encourage referencing journal articles, textbooks, or guidelines when
                        critiquing cases to support suggested changes or alternative diagnoses/treatments.
                      </li>
                      <li className="clash-font">
                        Questioning for Clarification: If something in the case is unclear, users should politely ask
                        questions before offering critiques or suggestions.
                      </li>
                      <li className="clash-font">
                        No Promotion of Unverified Treatments: Discourage the promotion of treatments or procedures that
                        have not been scientifically validated. Admins should monitor this and flag any
                        non-evidence-based comments.
                      </li>
                    </ul>
                  </div>

                  {/* Case Privacy & Legal Considerations */}
                  <div>
                    <p className="clash-font">4. Case Privacy and Legal Considerations</p>
                    <ul className="ml-6 mt-2 list-disc space-y-2">
                      <li className="clash-font">
                        Consent Forms: Ensure that case submissions do not violate any client confidentiality
                        agreements. Doctors should obtain consent from the pet owners before sharing any patient cases
                        on the platform.
                      </li>
                      <li className="clash-font">
                        Anonymization of Data: All case information must protect the identity of clients (owners) and
                        any personal data, limiting exposure to potential legal issues.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
