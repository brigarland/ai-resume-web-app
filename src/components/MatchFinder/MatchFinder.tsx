import { useNavigate } from "react-router-dom";
import { Title3, Body1, Badge } from "@fluentui/react-components";
import { Search24Regular } from "@fluentui/react-icons";
import { COMPANIES } from "@/constants";
import { PageWrapper } from "@/components/shared";
import { useMatchFinderStyles } from "./MatchFinder.styles";

export function MatchFinder() {
  const styles = useMatchFinderStyles();
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <main className={styles.companyMain}>
        <div className={styles.sectionLabel}>
          <Search24Regular />
          Select a company to scan
        </div>

        <div className={styles.companyGrid}>
          {COMPANIES.map((company) => (
            <div
              key={company.id}
              className={`${styles.companyCard} ${!company.isAvailable ? styles.companyCardDisabled : ""}`}
              onClick={() => company.isAvailable && navigate(company.path)}
              role="button"
              tabIndex={company.isAvailable ? 0 : -1}
              onKeyDown={(e) => {
                if (
                  company.isAvailable &&
                  (e.key === "Enter" || e.key === " ")
                ) {
                  navigate(company.path);
                }
              }}
            >
              <div className={styles.companyCardTop}>
                {/* <div
                  className={styles.companyLogo}
                  style={{ backgroundColor: company.color }}
                >
                  {company.logoInitials}
                </div> */}
                <div
                  className={styles.companyLogo}
                  style={{
                    backgroundColor: company.logo
                      ? "transparent"
                      : company.color,
                  }}
                >
                  {company.logo ? (
                    <img
                      className={styles.companyLogoImg}
                      src={company.logo}
                      alt={company.name}
                    />
                  ) : (
                    company.logoInitials
                  )}
                </div>
                {company.isAvailable ? (
                  <Badge appearance="filled" color="success" size="medium">
                    Available
                  </Badge>
                ) : (
                  <Badge appearance="outline" color="informative" size="medium">
                    Coming Soon
                  </Badge>
                )}
              </div>

              <div>
                <Title3 className={styles.companyCardTitle}>
                  {company.name}
                </Title3>
                <Body1>{company.description}</Body1>
              </div>
            </div>
          ))}
        </div>
      </main>
    </PageWrapper>
  );
}

export default MatchFinder;
