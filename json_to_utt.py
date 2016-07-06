from __future__ import print_function
import sys
import os
from os import path
import json
from pprint import pprint
import math
import argparse

IBM_RESULTS_DIR = '/Users/adamg/te/Polli/ASR/ibm/sst-python/output'
VIZ_OUT_DIR = '/Users/adamg/te/Polli/ASR/ibm/speech-viz'
CSV_OUT_DIR = '/Users/adamg/te/Polli/ASR/ibm/utterance-csv'

with open(path.join(VIZ_OUT_DIR,'results.html'),'w') as speech_html_out:
    speech_html_out.write('<html>')
    speech_html_out.write('\n')

    for json_file_name in os.listdir(IBM_RESULTS_DIR):
        if '.json' in json_file_name:
            # list of dictionaries, one for each token
            all_tokens_info = []
            with open(path.join(IBM_RESULTS_DIR,json_file_name)) as json_file:
                # read file into memory, made up of multile json objects
                j_str = json_file.read()
                # add split tag between json objects
                tweaked_json = j_str.replace('}{','}<SPLIT>{')
                # split json string by split tag
                split_json = tweaked_json.split('<SPLIT>')
                # parse each json object and add to list
                parsed_json = [json.loads(json_bit) for json_bit in split_json]

                # get timestamps and confidence of words in final hypothesis
                for j in parsed_json:
                    # this is where the data is embedded
                    data = j['results'][0]['alternatives'][0]
                    if j['results'][0]['final'] == True and \
                        'word_confidence' in data:
                        print("Parsing {}".format(json_file_name+" "+str(j['result_index'])))
                        # print(len(data['timestamps']),len(data['word_confidence'])) # should be ==
                        timestamps = data['timestamps']
                        confidence = data['word_confidence']
                        # print timestamps and confidence for each word token
                        for i in range(len(data['word_confidence'])):
                            # sanity check to make sure lists are the same
                            if timestamps[i][0] != confidence[i][0]:
                                print('Unequal word lists: idx {}, {} != {}'.format(i,timestamps[i][0],confidence[i][0]))
                                break
                            else:
                                token_dct = {}
                                token_dct['token'] = timestamps[i][0]
                                token_dct['token_begin'] = timestamps[i][1]
                                token_dct['token_end'] = timestamps[i][2]
                                token_dct['word_conf'] = confidence[i][1]
                                all_tokens_info.append(token_dct)

            # add heading to html file
            speech_html_out.write('<h2>'+json_file_name[:-5]+'</h2')
            speech_html_out.write('\n')

            for t in range(len(all_tokens_info)):
                # print(all_tokens_info[t])
                token = all_tokens_info[t]
                pre_token_pause = -1
                if t == 0:
                    pre_token_pause = token['token_begin']/10.0
                else:
                    pre_token_pause = token['token_begin'] - \
                                        all_tokens_info[t-1]['token_end']
                # if no pause, just print leading space. if pause, print underscore(s)
                pre_pause_spacing = -1 if pre_token_pause == 0.0 \
                                    else int(math.ceil(pre_token_pause*10))
                pre_token_separator = " " if pre_pause_spacing == -1 else "_"*pre_pause_spacing
                
                # if confidence below threshold, print word in grey
                confidence_color = '#8c8c8c' if token['word_conf'] <= 0.5 else '#000000'
                
                token_html = '<span style="color:{};">{}</span>'.format(confidence_color,token['token'])
                
                speech_html_out.write(pre_token_separator + token_html)
                
                speech_html_out.write('\n')

    speech_html_out.write('</html>')

    if __name__ == '__main__':

        # parse command line parameters
        parser = argparse.ArgumentParser(description='Convert JSONs to readable printouts of utterance timing')
        parser.add_argument('-viz', action='store_true', dest='vizOut', help='produce a visualization of utterances')
        parser.add_argument('-csv', action='store_true', dest='csvOut', help='produce a csv of utterance information')
        args = parser.parse_args()

