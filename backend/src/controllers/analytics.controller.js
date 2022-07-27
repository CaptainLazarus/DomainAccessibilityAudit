import { domainReadAllowed} from '../core/permissions';
import AuditModel from '../models/audit.model';

// Create an analytics model and update it accordingly. For now use whatever.
import AnalyticsModel from '../models/analytics.model'


exports.get_analytics = async (req , res) => {
    res.json({success: true , message: "Hello"});
}

exports.get_analytics_url = async (req , res) => {
    const {domain} = req.params;
    console.log(domain)
    // res.json({status: true , domain});
    // Check if url or not
    // if (typeof (url) != 'string') {
    //     res.json({ success: false, error: "Missing or wrong URL" });
    //     return;
    // }
    try {
        console.log("\n\n\n"+domain+"\n\n\n");
        const audit = await AuditModel.find({initialDomainName: domain}).populate({
          path: 'domains',
          select: 'nbViolations',
          options: { sort: { name: 1 } },
        }).lean().exec();
        if (audit == null) {
          res.json({ success: false, error: "Audits not found !" });
          return;
        }
        //await filterAudit(req.user, audit);
        if (!domainReadAllowed(req.user, audit.initialDomainName)) {
          res.json({ success: false, error: "You are not allowed to read this audit." });
          return;
        }
        res.json({ success: true, data: audit });
      } catch (err) {
        res.json({ success: false, error: err.message });
      }
}