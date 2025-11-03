-- Allow anonymous users to create tenders and responses
DROP POLICY IF EXISTS tenders_insert_authenticated ON tenders;
DROP POLICY IF EXISTS tender_responses_insert_authenticated ON tender_responses;

-- Allow anyone to insert tenders
CREATE POLICY tenders_insert_all ON tenders
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow anyone to insert tender responses
CREATE POLICY tender_responses_insert_all ON tender_responses
  FOR INSERT
  TO public
  WITH CHECK (true);
