/**
 * Rewrite site paths to land on the default page.
 *
 * http://peterknolle.com/using-angularjs-html-5-mode-in-salesforce-communities/
 * https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_site_urlRewriter_reference.htm
 */
global class {{ apiPrefix }}UrlRewriter implements Site.UrlRewriter {

	global PageReference mapRequestUrl(PageReference pageRef) {
		/**
		 * Fixes issue with remoting in site pages
		 * https://developer.salesforce.com/forums/ForumsMain?id=906F000000099DOIAY
		 */
		String path = '';
		if (pageRef.getUrl().contains('apexremote')) {
			path += '..';
		}
		path += Site.getPathPrefix();
		return new PageReference(path);
	}

	global List<PageReference> generateUrlFor(List<PageReference> pageRefs) {
		return pageRefs;
	}
}
